-- DeutschBuddy: persistent TTS rate limiting (replaces in-memory Maps)
--
-- Background: the Vercel serverless function and Vite dev middleware both used
-- in-memory Maps for IP-based rate limiting. On Vercel, each cold start creates
-- a new instance with empty buckets — rate limiting was completely bypassed.
--
-- This migration adds a persistent rate limit table and an RPC function that
-- both the serverless function and any future middleware can call.
--
-- Run in the Supabase SQL editor. Safe to re-run.

create extension if not exists "uuid-ossp";

create table if not exists public.tts_rate_limits (
  ip text primary key,
  window_start timestamptz not null,
  count int not null default 0
);

create index if not exists idx_tts_rate_window on public.tts_rate_limits(window_start);

alter table public.tts_rate_limits enable row level security;

-- Only the SECURITY DEFINER function below touches this table.
-- anon/authenticated have no direct grants.

create or replace function public.increment_tts_rate(p_ip text, p_window_start timestamptz)
returns int language plpgsql security definer set search_path = '' as $$
declare v int;
begin
  insert into public.tts_rate_limits (ip, window_start, count)
  values (p_ip, p_window_start, 1)
  on conflict (ip) do update set
    count = case
      when public.tts_rate_limits.window_start < p_window_start then 1
      else public.tts_rate_limits.count + 1
    end,
    window_start = case
      when public.tts_rate_limits.window_start < p_window_start then p_window_start
      else public.tts_rate_limits.window_start
    end
  returning count into v;
  return v;
end $$;

grant execute on function public.increment_tts_rate(text, timestamptz) to anon, authenticated;

notify pgrst, 'reload schema';