-- Fix RLS policies for DeutschBuddy
-- Run this in Supabase SQL Editor if you get permission errors

-- Drop all existing policies
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can view own progress" on public.progress;
drop policy if exists "Users can update own progress" on public.progress;
drop policy if exists "Users can insert own progress" on public.progress;
drop policy if exists "Users can upsert own progress" on public.progress;
drop policy if exists "Users can view own exercise results" on public.exercise_results;
drop policy if exists "Users can insert own exercise results" on public.exercise_results;
drop policy if exists "Users can delete own exercise results" on public.exercise_results;
drop policy if exists "Users can view own exam scores" on public.exam_scores;
drop policy if exists "Users can insert own exam scores" on public.exam_scores;
drop policy if exists "Users can delete own exam scores" on public.exam_scores;
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;
drop policy if exists "progress_select_own" on public.progress;
drop policy if exists "progress_insert_own" on public.progress;
drop policy if exists "progress_update_own" on public.progress;
drop policy if exists "progress_upsert_own" on public.progress;
drop policy if exists "progress_delete_own" on public.progress;
drop policy if exists "exercise_select_own" on public.exercise_results;
drop policy if exists "exercise_insert_own" on public.exercise_results;
drop policy if exists "exercise_update_own" on public.exercise_results;
drop policy if exists "exercise_delete_own" on public.exercise_results;
drop policy if exists "exam_select_own" on public.exam_scores;
drop policy if exists "exam_insert_own" on public.exam_scores;
drop policy if exists "exam_update_own" on public.exam_scores;
drop policy if exists "exam_delete_own" on public.exam_scores;

-- Profiles policies
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "profiles_delete_own" on public.profiles
  for delete using (auth.uid() = id);

-- Progress policies (supports upsert via INSERT ON CONFLICT)
create policy "progress_select_own" on public.progress
  for select using (auth.uid() = user_id);

create policy "progress_insert_own" on public.progress
  for insert with check (auth.uid() = user_id);

create policy "progress_update_own" on public.progress
  for update using (auth.uid() = user_id);

create policy "progress_delete_own" on public.progress
  for delete using (auth.uid() = user_id);

-- Exercise results policies
create policy "exercise_select_own" on public.exercise_results
  for select using (auth.uid() = user_id);

create policy "exercise_insert_own" on public.exercise_results
  for insert with check (auth.uid() = user_id);

create policy "exercise_update_own" on public.exercise_results
  for update using (auth.uid() = user_id);

create policy "exercise_delete_own" on public.exercise_results
  for delete using (auth.uid() = user_id);

-- Exam scores policies
create policy "exam_select_own" on public.exam_scores
  for select using (auth.uid() = user_id);

create policy "exam_insert_own" on public.exam_scores
  for insert with check (auth.uid() = user_id);

create policy "exam_update_own" on public.exam_scores
  for update using (auth.uid() = user_id);

create policy "exam_delete_own" on public.exam_scores
  for delete using (auth.uid() = user_id);

-- Grant necessary permissions
drop owned by authenticated;
drop owned by anon;
grant usage on schema public to anon, authenticated;
grant select on public.profiles to anon, authenticated;
grant insert, update, delete on public.profiles to authenticated;
grant select on public.progress to anon, authenticated;
grant insert, update, delete on public.progress to authenticated;
grant select on public.exercise_results to anon, authenticated;
grant insert, update, delete on public.exercise_results to authenticated;
grant select on public.exam_scores to anon, authenticated;
grant insert, update, delete on public.exam_scores to authenticated;

-- Recreate handle_new_user trigger function with proper error handling
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Insert profile if not exists
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  )
  on conflict (id) do nothing;

  -- Insert A1 progress if not exists
  insert into public.progress (user_id, level)
  values (new.id, 'A1')
  on conflict (user_id, level) do nothing;

  -- Insert A2 progress if not exists
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