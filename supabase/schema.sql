-- DeutschBuddy Database Schema for Supabase
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- User profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  selected_pacing text default 'standard' check (selected_pacing in ('standard', 'fast')),
  notification_preferences jsonb default '{
    "email_notifications": true,
    "push_notifications": true,
    "study_reminders": true,
    "achievement_alerts": true,
    "tips_and_facts": true,
    "community_updates": false
  }'::jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Progress table per user per level
create table if not exists public.progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  level text not null check (level in ('A1', 'A2')),
  xp integer default 0 not null,
  streak integer default 0 not null,
  last_study_date date,
  completed_tasks text[] default '{}' not null,
  badges jsonb default '[]' not null,
  unlocked_weeks integer[] default '{1}' not null,
  weekly_xp jsonb default '{}' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, level)
);

-- Index for faster lookups
create index if not exists idx_progress_user_level on public.progress(user_id, level);

-- Quiz and exercise results
create table if not exists public.exercise_results (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  level text not null check (level in ('A1', 'A2')),
  week_id integer not null,
  day_number integer not null,
  task_id text not null,
  task_type text not null,
  score integer,
  max_score integer,
  completed boolean default false not null,
  time_spent_seconds integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_exercise_results_user_level on public.exercise_results(user_id, level);

-- Mock exam scores
create table if not exists public.exam_scores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  level text not null check (level in ('A1', 'A2')),
  exam_type text not null check (exam_type in ('mock', 'final')),
  lesen_score integer,
  hoeren_score integer,
  schreiben_score integer,
  sprechen_score integer,
  total_score integer,
  taken_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_exam_scores_user_level on public.exam_scores(user_id, level);

-- Community posts
create table if not exists public.community_posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  category text not null default 'General',
  level text default 'All',
  solved boolean default false not null,
  upvotes integer default 0 not null,
  comment_count integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_community_posts_created_at on public.community_posts(created_at desc);
create index if not exists idx_community_posts_category on public.community_posts(category);

-- Community upvotes (one per user per post)
create table if not exists public.community_upvotes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  post_id uuid references public.community_posts(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, post_id)
);

create index if not exists idx_community_upvotes_post on public.community_upvotes(post_id);

-- Community comments
create table if not exists public.community_comments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  post_id uuid references public.community_posts(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_community_comments_post on public.community_comments(post_id);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.exercise_results enable row level security;
alter table public.exam_scores enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_upvotes enable row level security;
alter table public.community_comments enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can view community profiles"
  on public.profiles for select
  using (true);

comment on policy "Users can view community profiles" on public.profiles is 'Exposes id, full_name, and avatar_url to everyone. Email should not be selected in client queries.';

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can delete own profile"
  on public.profiles for delete
  using (auth.uid() = id);

-- Progress policies
create policy "Users can view own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own progress"
  on public.progress for delete
  using (auth.uid() = user_id);

-- Exercise results policies
create policy "Users can view own exercise results"
  on public.exercise_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own exercise results"
  on public.exercise_results for insert
  with check (auth.uid() = user_id);

create policy "Users can update own exercise results"
  on public.exercise_results for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own exercise results"
  on public.exercise_results for delete
  using (auth.uid() = user_id);

-- Exam scores policies
create policy "Users can view own exam scores"
  on public.exam_scores for select
  using (auth.uid() = user_id);

create policy "Users can insert own exam scores"
  on public.exam_scores for insert
  with check (auth.uid() = user_id);

create policy "Users can update own exam scores"
  on public.exam_scores for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own exam scores"
  on public.exam_scores for delete
  using (auth.uid() = user_id);

-- Community posts policies
create policy "Anyone can view community posts"
  on public.community_posts for select
  using (true);

create policy "Users can create community posts"
  on public.community_posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own community posts"
  on public.community_posts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own community posts"
  on public.community_posts for delete
  using (auth.uid() = user_id);

-- Community upvotes policies
create policy "Anyone can view upvotes"
  on public.community_upvotes for select
  using (true);

create policy "Users can manage own upvotes"
  on public.community_upvotes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Community comments policies
create policy "Anyone can view comments"
  on public.community_comments for select
  using (true);

create policy "Users can create comments"
  on public.community_comments for insert
  with check (auth.uid() = user_id);

create policy "Users can update own comments"
  on public.community_comments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.community_comments for delete
  using (auth.uid() = user_id);

-- Function to maintain upvote count
create or replace function public.update_post_upvote_count()
returns trigger as $$
begin
  if (tg_op = 'INSERT') then
    update public.community_posts set upvotes = upvotes + 1 where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.community_posts set upvotes = upvotes - 1 where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$ language plpgsql security definer;

create or replace trigger on_community_upvote_change
  after insert or delete on public.community_upvotes
  for each row execute function public.update_post_upvote_count();

-- Function to maintain comment count
create or replace function public.update_post_comment_count()
returns trigger as $$
begin
  if (tg_op = 'INSERT') then
    update public.community_posts set comment_count = comment_count + 1 where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.community_posts set comment_count = comment_count - 1 where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$ language plpgsql security definer;

create or replace trigger on_community_comment_change
  after insert or delete on public.community_comments
  for each row execute function public.update_post_comment_count();

-- Function to auto-create profile on signup
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

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
