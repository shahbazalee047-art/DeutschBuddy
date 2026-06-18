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

-- Function & trigger to auto-update comment_count
create or replace function public.update_comment_count()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.community_posts
    set comment_count = comment_count + 1
    where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update public.community_posts
    set comment_count = comment_count - 1
    where id = old.post_id;
  end if;
  return null;
end;
$$ language plpgsql security definer;

create or replace trigger on_comment_change
  after insert or delete on public.community_comments
  for each row execute function public.update_comment_count();

-- Function & trigger to auto-update upvotes count
create or replace function public.update_upvotes_count()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update public.community_posts
    set upvotes = upvotes + 1
    where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update public.community_posts
    set upvotes = upvotes - 1
    where id = old.post_id;
  end if;
  return null;
end;
$$ language plpgsql security definer;

create or replace trigger on_upvote_change
  after insert or delete on public.community_upvotes
  for each row execute function public.update_upvotes_count();

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
