-- DeutschBuddy: Google OAuth profile metadata support
-- Run this in the Supabase SQL Editor (or `supabase db push` if linked).
--
-- Makes automatic profile creation robust for Google OAuth signups:
--   Google users land with full_name/name and avatar_url/picture in
--   raw_user_meta_data. The trigger now reads those fields and stores the
--   avatar in public.profiles.avatar_url (previously it was never populated).
--
-- Security notes:
--   * SECURITY DEFINER runs as the owner, but the function always inserts
--     new.id from auth.users — a client can never choose a different user id.
--   * set search_path = '' prevents search-path hijacking.
--   * The insert is an ON CONFLICT (id) DO NOTHING upsert, so it never
--     overwrites an existing profile.
--   * RLS remains enabled; the trigger bypasses it only because it is
--     SECURITY DEFINER and only ever inserts the authenticated user's row.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
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
    new.email
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
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
