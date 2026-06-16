-- Fix RLS policies for DeutschBuddy
-- Run this in Supabase SQL Editor if you get permission errors

-- Drop existing policies if they exist
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can view own progress" on public.progress;
drop policy if exists "Users can update own progress" on public.progress;
drop policy if exists "Users can insert own progress" on public.progress;
drop policy if exists "Users can view own exercise results" on public.exercise_results;
drop policy if exists "Users can insert own exercise results" on public.exercise_results;
drop policy if exists "Users can view own exam scores" on public.exam_scores;
drop policy if exists "Users can insert own exam scores" on public.exam_scores;

-- Profiles policies
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Progress policies
create policy "progress_select_own" on public.progress
  for select using (auth.uid() = user_id);

create policy "progress_insert_own" on public.progress
  for insert with check (auth.uid() = user_id);

create policy "progress_update_own" on public.progress
  for update using (auth.uid() = user_id);

create policy "progress_upsert_own" on public.progress
  for insert with check (auth.uid() = user_id);

-- Exercise results policies
create policy "exercise_select_own" on public.exercise_results
  for select using (auth.uid() = user_id);

create policy "exercise_insert_own" on public.exercise_results
  for insert with check (auth.uid() = user_id);

-- Exam scores policies
create policy "exam_select_own" on public.exam_scores
  for select using (auth.uid() = user_id);

create policy "exam_insert_own" on public.exam_scores
  for insert with check (auth.uid() = user_id);

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant insert, update on public.profiles to authenticated;
grant select on public.progress to anon, authenticated;
grant insert, update on public.progress to authenticated;
grant select on public.exercise_results to anon, authenticated;
grant insert on public.exercise_results to authenticated;
grant select on public.exam_scores to anon, authenticated;
grant insert on public.exam_scores to authenticated;
