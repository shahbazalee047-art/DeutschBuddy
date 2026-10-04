-- DeutschBuddy: stop game XP from inflating the week-1 XP chart.
--
-- Background: game sessions (SpeedBlitz, GenderDungeon, PictureMatch)
-- award XP through completeTask() with a synthetic task id
-- (`game-<name>-<date>`) mapped to week 1. Before the app-level fix,
-- that XP also accumulated in progress.weekly_xp["W1"], inflating the
-- "XP by Week" chart in ProgressDashboard (total XP was unaffected).
--
-- This migration subtracts the game-derived XP from W1 for existing
-- rows. It is idempotent: the weekly_xp_game_repaired guard column
-- makes every run after the first a no-op. Safe against a fully-synced
-- database. Run in the Supabase SQL editor.

create extension if not exists "uuid-ossp";

alter table public.progress
  add column if not exists weekly_xp_game_repaired boolean default false not null;

-- Game XP per (user, level): the FIRST attempt of each game-day task
-- is the one that awarded XP — completeTask is idempotent per task id
-- (`game-<name>-<date>`, once per game per day) while exercise_results
-- logs every replay. XP per game is least(greatest(floor(score/2), 0), 50)
-- — see DashboardContext.handleGameScore.
with first_attempts as (
  select distinct on (user_id, level, task_id)
         user_id, level, score
  from public.exercise_results
  where task_type like 'game:%'
  order by user_id, level, task_id, created_at
),
game_xp as (
  select user_id, level,
         coalesce(sum(least(greatest(floor(coalesce(score, 0) / 2), 0), 50)), 0)::int as gx
  from first_attempts
  group by user_id, level
)
update public.progress p
set weekly_xp = jsonb_set(
      p.weekly_xp,
      '{W1}',
      to_jsonb(greatest(((p.weekly_xp ->> 'W1')::int) - g.gx, 0))
    ),
    weekly_xp_game_repaired = true
from game_xp g
where p.user_id = g.user_id
  and p.level = g.level
  and not p.weekly_xp_game_repaired
  and (p.weekly_xp ->> 'W1') is not null
  and (p.weekly_xp ->> 'W1') ~ '^[0-9]+$';

-- Rows with no game XP (or no W1 bucket) are already correct — just
-- mark them so the migration never reprocesses them.
update public.progress
set weekly_xp_game_repaired = true
where not weekly_xp_game_repaired;

notify pgrst, 'reload schema';
