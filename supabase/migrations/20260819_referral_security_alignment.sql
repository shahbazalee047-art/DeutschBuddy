-- DeutschBuddy: apply the current referral/security contract to existing projects.
--
-- This is intentionally a new migration. The earlier referral migration may
-- already be present in a live project's migration history, so editing that
-- older file would not replay its corrected grants or RPC.

create extension if not exists "uuid-ossp";

alter table public.profiles
  add column if not exists referral_code text,
  add column if not exists referred_by text,
  add column if not exists referral_count integer not null default 0;

create unique index if not exists idx_profiles_referral_code
  on public.profiles (referral_code)
  where referral_code is not null;

create table if not exists public.referrals (
  id uuid default uuid_generate_v4() primary key,
  referrer_id uuid references public.profiles(id) on delete cascade not null,
  referred_user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (referred_user_id)
);

alter table public.referrals enable row level security;

-- Keep profile browsing limited to non-sensitive columns. Referral metadata is
-- read through get_my_referral_info() and written through the guarded setter.
revoke select on public.profiles from anon, authenticated;
grant select (id, full_name, avatar_url, selected_pacing, notification_preferences, created_at, updated_at)
  on public.profiles to anon, authenticated;
grant insert, update, delete on public.profiles to authenticated;

-- Keep the signup trigger canonical across email and Google OAuth signups.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email, referral_code)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      ''
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture',
      null
    ),
    new.email,
    'DB-' || upper(substr(md5(random()::text), 1, 8))
  )
  on conflict (id) do nothing;

  insert into public.progress (user_id, level)
  values (new.id, 'A1')
  on conflict (user_id, level) do nothing;

  insert into public.progress (user_id, level)
  values (new.id, 'A2')
  on conflict (user_id, level) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.set_my_referral_info(
  p_referral_code text,
  p_referred_by text default null,
  p_selected_pacing text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    return;
  end if;

  update public.profiles
  set
    referral_code = coalesce(nullif(trim(p_referral_code), ''), referral_code),
    referred_by = coalesce(nullif(trim(p_referred_by), ''), referred_by),
    selected_pacing = case
      when p_selected_pacing in ('standard', 'fast') then p_selected_pacing
      else selected_pacing
    end,
    updated_at = timezone('utc'::text, now())
  where id = auth.uid();
end;
$$;

create or replace function public.record_referral(p_ref_code text, p_new_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_referrer uuid;
  v_created uuid;
begin
  if p_ref_code is null or p_new_user_id is null
    or auth.uid() is null or auth.uid() <> p_new_user_id then
    return null;
  end if;

  select id into v_referrer
  from public.profiles
  where referral_code = p_ref_code;

  if v_referrer is null or v_referrer = p_new_user_id then
    return null;
  end if;

  insert into public.referrals (referrer_id, referred_user_id)
  values (v_referrer, p_new_user_id)
  on conflict (referred_user_id) do nothing
  returning referrer_id into v_created;

  if v_created is null then
    return null;
  end if;

  update public.profiles
  set
    referral_count = referral_count + 1,
    updated_at = timezone('utc'::text, now())
  where id = v_created;

  update public.progress
  set
    xp = xp + 25,
    badges = badges || jsonb_build_array(
      jsonb_build_object(
        'id', 'referral-builder',
        'name', 'Community Builder',
        'icon', '🤝',
        'earnedAt', now()
      )
    )
  where user_id = v_created
    and level = 'A1'
    and not badges @> '[{"id":"referral-builder"}]';

  return v_created;
end;
$$;

create or replace function public.get_my_referral_info()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.profiles%rowtype;
begin
  select * into v_row from public.profiles where id = auth.uid();
  if v_row.id is null then
    return null;
  end if;

  return jsonb_build_object(
    'referral_code', v_row.referral_code,
    'referral_count', v_row.referral_count,
    'referred_by', v_row.referred_by
  );
end;
$$;

revoke execute on function public.set_my_referral_info(text, text, text) from public, anon;
revoke execute on function public.record_referral(text, uuid) from public, anon;
revoke execute on function public.get_my_referral_info() from public, anon;
grant execute on function public.set_my_referral_info(text, text, text) to authenticated;
grant execute on function public.record_referral(text, uuid) to authenticated;
grant execute on function public.get_my_referral_info() to authenticated;

notify pgrst, 'reload schema';
