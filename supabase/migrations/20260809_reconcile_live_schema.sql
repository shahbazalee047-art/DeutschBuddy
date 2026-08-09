-- DeutschBuddy — Reconcile live DB schema with supabase/schema.sql
-- QA-pass fix: live `progress` table was missing `revise_tasks`, and live
-- `profiles` was missing `notification_preferences`, so every progress upsert
-- failed with PGRST204 and every profile fetch failed with 42703.
-- Idempotent: safe to run against a fully-synced database too.

-- 1) progress.revise_tasks (text[], default empty)
alter table public.progress
  add column if not exists revise_tasks text[] default '{}' not null;

-- 2) profiles.notification_preferences (jsonb, default full prefs) —
--    default must match supabase/schema.sql exactly.
alter table public.profiles
  add column if not exists notification_preferences jsonb default '{
    "email_notifications": true,
    "push_notifications": true,
    "study_reminders": true,
    "achievement_alerts": true,
    "tips_and_facts": true,
    "community_updates": false
  }'::jsonb not null;

-- 3) Keep the column-level REVOKE semantics intact: revoke select for the
--    anon/authenticated roles, then re-grant the public columns only. This
--    must run AFTER every migration that touches profiles so the email
--    column stays hidden from clients (see fix-rls.sql ordering note).
revoke select on public.profiles from anon, authenticated;
grant select (id, full_name, avatar_url, selected_pacing, notification_preferences, created_at, updated_at)
  on public.profiles to anon, authenticated;

comment on table public.profiles is
  'Email column is hidden from anon/authenticated via column-level GRANT. Use the auth session for the current user email; never expose other users emails.';

-- 4) Refresh PostgREST's schema cache so the columns become visible to the
--    REST API (and the anon client) immediately, avoiding a stale PGRST204.
notify pgrst, 'reload schema';