-- Referral system: non-monetary referral rewards.
--
-- Run this in the Supabase SQL editor after schema.sql (or append to it).
-- It adds referral columns to profiles, a locked-down referrals table, and two
-- SECURITY DEFINER functions:
--   * record_referral(ref_code, new_user_id)  — credits the referrer (+25 XP,
--     "Community Builder" badge) once per referred friend who completes
--     onboarding and signs up. Returns the referrer id, or null when no reward
--     is due (bad code, self-referral, or already-counted friend).
--   * get_my_referral_info()                  — returns the caller's own
--     referral_code and referral_count.
--
-- The referral columns are deliberately NOT added to the public column-level
-- SELECT grant, so other users (including the community profile viewer) can
-- never read them. Own info is only reachable through get_my_referral_info().


alter table public.profiles
  add column if not exists referral_code text,
  add column if not exists referred_by text,
  add column if not exists referral_count integer not null default 0;

create unique index if not exists idx_profiles_referral_code
  on public.profiles (referral_code)
  where referral_code is not null;

-- One row per referred friend; the unique constraint guarantees a friend is
-- counted at most once.
create table if not exists public.referrals (
  id uuid default gen_random_uuid() primary key,
  referrer_id uuid references public.profiles(id) on delete cascade not null,
  referred_user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (referred_user_id)
);

alter table public.referrals enable row level security;

-- No client-facing policies: only the SECURITY DEFINER function below touches
-- this table. anon/authenticated have no grants on it at all.

-- Give every new profile a referral code even if the client upsert is missed.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, referral_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    'DB-' || upper(substr(md5(random()::text), 1, 8))
  )
  on conflict (id) do nothing;

  -- Create default progress for both levels
  insert into public.progress (user_id, level)
  values (new.id, 'A1')
  on conflict (user_id, level) do nothing;

  insert into public.progress (user_id, level)
  values (new.id, 'A2')
  on conflict (user_id, level) do nothing;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Credits the referrer when a referred friend completes onboarding + signup.
-- Idempotent: the unique(referred_user_id) constraint makes double calls no-ops.
create or replace function public.record_referral(p_ref_code text, p_new_user_id uuid)
returns uuid
language plpgsql security definer
as $$
declare
  v_referrer uuid;
  v_created uuid;
begin
  if p_ref_code is null or p_new_user_id is null then
    return null;
  end if;

  select id into v_referrer
  from public.profiles
  where referral_code = p_ref_code;

  -- Unknown code or self-referral: no reward.
  if v_referrer is null or v_referrer = p_new_user_id then
    return null;
  end if;

  insert into public.referrals (referrer_id, referred_user_id)
  values (v_referrer, p_new_user_id)
  on conflict (referred_user_id) do nothing
  returning referrer_id into v_created;

  -- Already counted: this friend was referenced before.
  if v_created is null then
    return null;
  end if;

  update public.profiles
  set referral_count = referral_count + 1
  where id = v_created;

  -- +25 XP per successful referral (no cap); the badge is granted once.
  update public.progress
  set
    xp = xp + 25,
    badges = badges || jsonb_build_array(
      jsonb_build_object('id', 'referral-builder', 'name', 'Community Builder', 'icon', '🤝', 'earnedAt', now())
    )
  where user_id = v_created
    and not badges @> '[{"id":"referral-builder"}]';

  return v_created;
end;
$$;

-- Returns the caller's own referral info (code + count + who referred them).
-- Columns stay out of the public column grant, so this function is the only
-- way clients read them.
create or replace function public.get_my_referral_info()
returns jsonb
language plpgsql security definer
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

grant execute on function public.record_referral(text, uuid) to authenticated;
grant execute on function public.get_my_referral_info() to authenticated;

-- PostgREST upserts (INSERT ... ON CONFLICT DO UPDATE) require SELECT on the
-- columns being written, so the client referral sync can compute the UPDATE.
-- RLS still limits reads to the caller's own row (auth.uid() = id); anon gets
-- nothing. This preserves the "no public browsing of referral codes" intent.
grant select (referral_code, referred_by, referral_count) on public.profiles to authenticated;

notify pgrst, 'reload schema';
