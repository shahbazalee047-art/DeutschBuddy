-- Community Posts & Comments Schema
-- Run this in the Supabase SQL Editor after schema.sql

-- Posts table
create table if not exists public.community_posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  category text not null check (category in ('Grammar', 'Vocabulary', 'Pronunciation', 'Culture', 'General')),
  level text not null check (level in ('A1', 'A2', 'All')),
  upvotes integer default 0 not null,
  comment_count integer default 0 not null,
  solved boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Comments table
create table if not exists public.community_comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.community_posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Upvotes join table (prevents duplicate upvotes)
create table if not exists public.community_upvotes (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.community_posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_id)
);

-- Comment/upvote count maintenance
-- NOTE: the canonical trigger functions and triggers live in schema.sql
-- (update_post_comment_count / update_post_upvote_count bound via
-- on_community_comment_change / on_community_upvote_change). Earlier versions
-- of this file defined a SECOND pair (update_comment_count / update_upvotes_count)
-- on the same tables — running both defined two triggers per row change and
-- DOUBLE-COUNTED every upvote/comment. The legacy triggers are dropped below
-- so this file is safe to (re)apply on any database.
drop trigger if exists on_upvote_change on public.community_upvotes;
drop trigger if exists on_comment_change on public.community_comments;
drop function if exists public.update_upvotes_count();
drop function if exists public.update_comment_count();

-- Row Level Security
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_upvotes enable row level security;

-- Posts: all authenticated users can read, author can update/delete
create policy "Anyone authenticated can view posts"
  on public.community_posts for select
  using (auth.role() = 'authenticated');

create policy "Users can create posts"
  on public.community_posts for insert
  with check (auth.uid() = user_id);

create policy "Authors can update their posts"
  on public.community_posts for update
  using (auth.uid() = user_id);

create policy "Authors can delete their posts"
  on public.community_posts for delete
  using (auth.uid() = user_id);

-- Comments: all authenticated can read, author can manage
create policy "Anyone authenticated can view comments"
  on public.community_comments for select
  using (auth.role() = 'authenticated');

create policy "Users can comment"
  on public.community_comments for insert
  with check (auth.uid() = user_id);

create policy "Authors can delete their comments"
  on public.community_comments for delete
  using (auth.uid() = user_id);

-- Upvotes: all authenticated can read, one per user per post
create policy "Anyone authenticated can view upvotes"
  on public.community_upvotes for select
  using (auth.role() = 'authenticated');

create policy "Users can upvote"
  on public.community_upvotes for insert
  with check (auth.uid() = user_id);

create policy "Users can remove their upvote"
  on public.community_upvotes for delete
  using (auth.uid() = user_id);
