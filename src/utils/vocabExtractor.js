export function extractVocabulary(levelData) {
  if (!levelData?.weeks) return [];

  const vocab = [];

  for (const week of levelData.weeks) {
    for (const day of week.days || []) {
      for (const task of day.tasks || []) {
        if (!task.content?.items) continue;
        for (const [itemIndex, item] of task.content.items.entries()) {
          if (item.german && item.english) {
            vocab.push({
              // Curriculum task ids are stable progress keys; using the task
              // id plus item position keeps SRS history tied to the actual
              // lesson instead of the order in which a level was extracted.
              id: `vocab-${task.id}-${itemIndex}`,
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
