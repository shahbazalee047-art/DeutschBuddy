// Local calendar-date utilities used for streaks and the activity calendar.
//
// We deliberately use the user's LOCAL calendar date (not UTC) so that a learner
// who studies at 23:00 and again at 01:00 counts as two consecutive study days
// in their own timezone. The `progress.last_study_date` column is a plain
// `date` (no timezone), so storing local YYYY-MM-DD strings is consistent with
// the schema and reads back unchanged.

export function getLocalDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getYesterdayDateString(date = new Date()) {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

// Add (or subtract) days from a 'YYYY-MM-DD' string, returning a new 'YYYY-MM-DD'
// string. Operates in local time. DST-safe because we mutate the calendar day
// directly rather than using 86_400_000ms arithmetic.
export function addDaysDateString(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return getLocalDateString(d);
}
