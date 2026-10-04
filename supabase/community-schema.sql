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
-- FIXED: Do NOT drop the canonical triggers from schema.sql/fix-rls.sql.
-- This file only creates tables + RLS; it must not drop triggers.
-- drop trigger if exists on_upvote_change on public.community_upvotes;
-- drop trigger if exists on_comment_change on public.community_comments;
-- drop function if exists public.update_upvotes_count();
-- drop function if exists public.update_comment_count();

-- Row Level Security
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_upvotes enable row level security;

-- Posts: anyone can read (public community)
create policy "Anyone can view community posts"
  on public.community_posts for select using (true);

create policy "Users can create community posts"
  on public.community_posts for insert with check (auth.uid() = user_id);

create policy "Users can update own community posts"
  on public.community_posts for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete own community posts"
  on public.community_posts for delete using (auth.uid() = user_id);

-- Comments: anyone can read
create policy "Anyone can view comments"
  on public.community_comments for select using (true);

create policy "Users can create comments"
  on public.community_comments for insert with check (auth.uid() = user_id);

create policy "Users can update own comments"
  on public.community_comments for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.community_comments for delete using (auth.uid() = user_id);

-- Upvotes: anyone can read, users manage own
create policy "Anyone can view upvotes"
  on public.community_upvotes for select using (true);

create policy "Users can manage own upvotes"
  on public.community_upvotes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
