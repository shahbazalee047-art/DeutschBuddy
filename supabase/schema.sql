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
  referral_code text,
  referred_by text,
  referral_count integer default 0 not null,
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

-- Keep a schema-only installation compatible with the canonical auth trigger
-- and make this file safe to run against databases created before referrals.
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

-- Progress table per user per level
create table if not exists public.progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  level text not null check (level in ('A1', 'A2')),
  xp integer default 0 not null,
  streak integer default 0 not null,
  last_study_date date,
  completed_tasks text[] default '{}' not null,
  revise_tasks text[] default '{}' not null,
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
  level text default 'All' check (level in ('All', 'A1', 'A2')),
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
alter table public.referrals enable row level security;

-- Profiles policies
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can view community profiles" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can delete own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can view community profiles"
  on public.profiles for select
  using (true);

comment on policy "Users can view community profiles" on public.profiles is 'Exposes id, full_name, and avatar_url to everyone. The email column is protected by a column-level REVOKE (see below).';

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

-- Column-level access control: prevent anon/authenticated roles from reading
-- the `email` column of any profile. RLS controls row access; column-level
-- GRANTs control column access. Email is copied from auth.users by the
-- handle_new_user trigger (a SECURITY DEFINER function that bypasses GRANTs),
-- so signup still works. Clients read the current user's email from the auth
-- session, never from this table.
revoke select on public.profiles from anon, authenticated;
grant select (id, full_name, avatar_url, selected_pacing, notification_preferences, created_at, updated_at)
  on public.profiles to anon, authenticated;

comment on table public.profiles is
  'Email column is hidden from anon/authenticated via column-level GRANT. Use the auth session for the current user email; never expose other users emails.';

-- Progress policies
drop policy if exists "Users can view own progress" on public.progress;
drop policy if exists "Users can insert own progress" on public.progress;
drop policy if exists "Users can update own progress" on public.progress;
drop policy if exists "Users can delete own progress" on public.progress;
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
drop policy if exists "Users can view own exercise results" on public.exercise_results;
drop policy if exists "Users can insert own exercise results" on public.exercise_results;
drop policy if exists "Users can update own exercise results" on public.exercise_results;
drop policy if exists "Users can delete own exercise results" on public.exercise_results;
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
drop policy if exists "Users can view own exam scores" on public.exam_scores;
drop policy if exists "Users can insert own exam scores" on public.exam_scores;
drop policy if exists "Users can update own exam scores" on public.exam_scores;
drop policy if exists "Users can delete own exam scores" on public.exam_scores;
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
drop policy if exists "Anyone can view community posts" on public.community_posts;
drop policy if exists "Users can create community posts" on public.community_posts;
drop policy if exists "Users can update own community posts" on public.community_posts;
drop policy if exists "Users can delete own community posts" on public.community_posts;
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
drop policy if exists "Anyone can view upvotes" on public.community_upvotes;
drop policy if exists "Users can manage own upvotes" on public.community_upvotes;
create policy "Anyone can view upvotes"
  on public.community_upvotes for select
  using (true);

create policy "Users can manage own upvotes"
  on public.community_upvotes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Community comments policies
drop policy if exists "Anyone can view comments" on public.community_comments;
drop policy if exists "Users can create comments" on public.community_comments;
drop policy if exists "Users can update own comments" on public.community_comments;
drop policy if exists "Users can delete own comments" on public.community_comments;
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

-- API grants. Referral data is intentionally omitted from the profile SELECT
-- grant; clients use the SECURITY DEFINER referral functions below instead.
grant usage on schema public to anon, authenticated;
grant insert, update, delete on public.profiles to authenticated;
grant select on public.progress, public.exercise_results, public.exam_scores,
  public.community_posts, public.community_upvotes, public.community_comments
  to anon, authenticated;
grant insert, update, delete on public.progress, public.exercise_results,
  public.exam_scores, public.community_posts, public.community_upvotes,
  public.community_comments to authenticated;

-- Function to maintain upvote count
-- SECURITY DEFINER access is pinned with an empty search_path; counters are
-- floored at 0 so repeated/lost deletes can never push a count negative.
create or replace function public.update_post_upvote_count()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  if (tg_op = 'INSERT') then
    update public.community_posts set upvotes = upvotes + 1 where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.community_posts set upvotes = greatest(upvotes - 1, 0) where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$;

create or replace trigger on_community_upvote_change
  after insert or delete on public.community_upvotes
  for each row execute function public.update_post_upvote_count();

-- Function to maintain comment count
create or replace function public.update_post_comment_count()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  if (tg_op = 'INSERT') then
    update public.community_posts set comment_count = comment_count + 1 where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.community_posts set comment_count = greatest(comment_count - 1, 0) where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$;

create or replace trigger on_community_comment_change
  after insert or delete on public.community_comments
  for each row execute function public.update_post_comment_count();

-- Function to auto-create profile on signup
-- Works for BOTH email and Google signups:
--   email:  raw_user_meta_data.full_name
--   Google: raw_user_meta_data.full_name / name and avatar_url / picture
-- (Supabase normalizes Google OAuth metadata, but the coalesce is defensive
-- against provider metadata differences.)
-- NOTE: this is the CANONICAL final version (search_path pinning, avatar_url
-- from Google, and a referral_code generated server-side). Referral and Google
-- migration files must not re-define this function with fewer features — a
-- later `create or replace` that drops referral_code/avatar_url silently
-- regresses every new signup.
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

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Referral functions. These keep referral columns out of the public profile
-- grant while still allowing the current account to initialize its own code.
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
language plpgsql security definer
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
  set referral_count = referral_count + 1,
      updated_at = timezone('utc'::text, now())
  where id = v_created;

  update public.progress
  set
    xp = xp + 25,
    badges = badges || jsonb_build_array(
      jsonb_build_object('id', 'referral-builder', 'name', 'Community Builder', 'icon', '🤝', 'earnedAt', now())
    )
  where user_id = v_created
    and level = 'A1'
    and not badges @> '[{"id":"referral-builder"}]';

  return v_created;
end;
$$;

create or replace function public.get_my_referral_info()
returns jsonb
language plpgsql security definer
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
