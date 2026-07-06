export function extractVocabulary(levelData) {
  if (!levelData?.weeks) return [];

  const vocab = [];
  let index = 0;

  for (const week of levelData.weeks) {
    for (const day of week.days || []) {
      for (const task of day.tasks || []) {
        if (!task.content?.items) continue;
        for (const item of task.content.items) {
          if (item.german && item.english) {
            vocab.push({
              id: `vocab-${index++}`,
              german: item.german,
              english: item.english,
              pronunciation: item.pronunciation || '',
              example: item.example || '',
              weekId: week.id,
              day: day.day,
              taskId: task.id
            });
          }
        }
      }
    }
  }

  return vocab;
}
