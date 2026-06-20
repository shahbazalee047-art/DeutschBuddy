-- Fix RLS policies for DeutschBuddy
-- Run this in Supabase SQL Editor if you get permission errors
-- This script safely drops and recreates only the policies it defines.

-- Ensure notification_preferences column exists on profiles
alter table public.profiles
  add column if not exists notification_preferences jsonb default '{
    "email_notifications": true,
    "push_notifications": true,
    "study_reminders": true,
    "achievement_alerts": true,
    "tips_and_facts": true,
    "community_updates": false
  }'::jsonb not null;

-- Profiles policies
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can view community profiles" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can delete own profile" on public.profiles;
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can delete own profile" on public.profiles
  for delete using (auth.uid() = id);

-- Progress policies
drop policy if exists "Users can view own progress" on public.progress;
drop policy if exists "Users can insert own progress" on public.progress;
drop policy if exists "Users can update own progress" on public.progress;
drop policy if exists "Users can delete own progress" on public.progress;
drop policy if exists "progress_select_own" on public.progress;
drop policy if exists "progress_insert_own" on public.progress;
drop policy if exists "progress_update_own" on public.progress;
drop policy if exists "progress_upsert_own" on public.progress;
drop policy if exists "progress_delete_own" on public.progress;

create policy "Users can view own progress" on public.progress
  for select using (auth.uid() = user_id);

create policy "Users can insert own progress" on public.progress
  for insert with check (auth.uid() = user_id);

create policy "Users can update own progress" on public.progress
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own progress" on public.progress
  for delete using (auth.uid() = user_id);

-- Exercise results policies
drop policy if exists "Users can view own exercise results" on public.exercise_results;
drop policy if exists "Users can insert own exercise results" on public.exercise_results;
drop policy if exists "Users can update own exercise results" on public.exercise_results;
drop policy if exists "Users can delete own exercise results" on public.exercise_results;
drop policy if exists "exercise_select_own" on public.exercise_results;
drop policy if exists "exercise_insert_own" on public.exercise_results;
drop policy if exists "exercise_update_own" on public.exercise_results;
drop policy if exists "exercise_delete_own" on public.exercise_results;

create policy "Users can view own exercise results" on public.exercise_results
  for select using (auth.uid() = user_id);

create policy "Users can insert own exercise results" on public.exercise_results
  for insert with check (auth.uid() = user_id);

create policy "Users can update own exercise results" on public.exercise_results
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own exercise results" on public.exercise_results
  for delete using (auth.uid() = user_id);

-- Exam scores policies
drop policy if exists "Users can view own exam scores" on public.exam_scores;
drop policy if exists "Users can insert own exam scores" on public.exam_scores;
drop policy if exists "Users can update own exam scores" on public.exam_scores;
drop policy if exists "Users can delete own exam scores" on public.exam_scores;
drop policy if exists "exam_select_own" on public.exam_scores;
drop policy if exists "exam_insert_own" on public.exam_scores;
drop policy if exists "exam_update_own" on public.exam_scores;
drop policy if exists "exam_delete_own" on public.exam_scores;

create policy "Users can view own exam scores" on public.exam_scores
  for select using (auth.uid() = user_id);

create policy "Users can insert own exam scores" on public.exam_scores
  for insert with check (auth.uid() = user_id);

create policy "Users can update own exam scores" on public.exam_scores
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own exam scores" on public.exam_scores
  for delete using (auth.uid() = user_id);

-- Community posts policies
drop policy if exists "Anyone can view community posts" on public.community_posts;
drop policy if exists "Users can create community posts" on public.community_posts;
drop policy if exists "Users can update own community posts" on public.community_posts;
drop policy if exists "Users can delete own community posts" on public.community_posts;

create policy "Anyone can view community posts" on public.community_posts
  for select using (true);

create policy "Users can create community posts" on public.community_posts
  for insert with check (auth.uid() = user_id);

create policy "Users can update own community posts" on public.community_posts
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own community posts" on public.community_posts
  for delete using (auth.uid() = user_id);

-- Community upvotes policies
drop policy if exists "Anyone can view upvotes" on public.community_upvotes;
drop policy if exists "Users can manage own upvotes" on public.community_upvotes;

create policy "Anyone can view upvotes" on public.community_upvotes
  for select using (true);

create policy "Users can manage own upvotes" on public.community_upvotes
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Community comments policies
drop policy if exists "Anyone can view comments" on public.community_comments;
drop policy if exists "Users can create comments" on public.community_comments;
drop policy if exists "Users can update own comments" on public.community_comments;
drop policy if exists "Users can delete own comments" on public.community_comments;

create policy "Anyone can view comments" on public.community_comments
  for select using (true);

create policy "Users can create comments" on public.community_comments
  for insert with check (auth.uid() = user_id);

create policy "Users can update own comments" on public.community_comments
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own comments" on public.community_comments
  for delete using (auth.uid() = user_id);

-- Grant necessary permissions (safe, does not drop objects)
grant usage on schema public to anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant insert, update, delete on public.profiles to authenticated;
grant select on public.progress to anon, authenticated;
grant insert, update, delete on public.progress to authenticated;
grant select on public.exercise_results to anon, authenticated;
grant insert, update, delete on public.exercise_results to authenticated;
grant select on public.exam_scores to anon, authenticated;
grant insert, update, delete on public.exam_scores to authenticated;
grant select on public.community_posts to anon, authenticated;
grant insert, update, delete on public.community_posts to authenticated;
grant select on public.community_upvotes to anon, authenticated;
grant insert, update, delete on public.community_upvotes to authenticated;
grant select on public.community_comments to anon, authenticated;
grant insert, update, delete on public.community_comments to authenticated;

-- Ensure tables and RLS are enabled
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.exercise_results enable row level security;
alter table public.exam_scores enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_upvotes enable row level security;
alter table public.community_comments enable row level security;

-- Recreate handle_new_user trigger function with proper error handling
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
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
$$ language plpgsql security definer;

-- Drop and recreate trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
