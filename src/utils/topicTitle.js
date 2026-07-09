// Topic-title helpers.
//
// Curriculum week titles are stored in the form "<German> — <English>"
// (separator is U+2014 EM DASH, e.g. "Das Alphabet — The Alphabet").
//
// Per the product UX:
//   - Overview / list views show the ENGLISH topic name (less intimidating
//     for first-time learners).
//   - Task / day views reveal the GERMAN topic name (so learners encounter
//     the target-language name once they're inside the lesson).
//
// Titles without a separator fall back to the whole string as the English
// name (German name empty), so legacy/short titles render unchanged.

const SEPARATORS = [' — ', ' – ', ' - ']; // em dash, en dash, hyphen (longest first)

export function splitTopicTitle(title) {
  if (!title) return { de: '', en: '' };
  for (const sep of SEPARATORS) {
    const idx = title.indexOf(sep);
    if (idx !== -1) {
      return {
        de: title.slice(0, idx).trim(),
        en: title.slice(idx + sep.length).trim(),
      };
    }
  }
  return { de: '', en: title.trim() };
}

export function englishTopicTitle(title) {
  return splitTopicTitle(title).en || title;
}

export function germanTopicTitle(title) {
  return splitTopicTitle(title).de;
}

// Locate a task anywhere in the curriculum by its id. Returns the task plus
// its containing week and day, or null if not found.
export function findTaskById(levelData, taskId) {
  if (!levelData?.weeks) return null;
  for (const week of levelData.weeks) {
    for (const day of week.days || []) {
      for (const task of day.tasks || []) {
        if (task.id === taskId) {
          return { week, day, task };
        }
      }
    }
  }
  return null;
}
