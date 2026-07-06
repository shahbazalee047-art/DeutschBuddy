const DEFAULT_EASE = 2.5;
const MIN_EASE = 1.3;
const MAX_EASE = 3.5;

export function createCard(item) {
  return {
    id: item.id,
    german: item.german,
    english: item.english,
    pronunciation: item.pronunciation || '',
    example: item.example || '',
    interval: 0,
    repetitions: 0,
    easeFactor: DEFAULT_EASE,
    dueDate: new Date().toISOString(),
    lastReviewed: null,
    status: 'new'
  };
}

export function reviewCard(card, quality) {
  // quality: 0 = wrong, 3 = hard, 4 = good, 5 = easy
  const clampedQuality = Math.max(0, Math.min(5, quality));
  const next = { ...card };

  next.lastReviewed = new Date().toISOString();

  if (clampedQuality < 3) {
    next.repetitions = 0;
    next.interval = 1;
    next.status = 'learning';
  } else {
    next.repetitions = (next.repetitions || 0) + 1;
    if (next.repetitions === 1) next.interval = 1;
    else if (next.repetitions === 2) next.interval = 6;
    else next.interval = Math.round((next.interval || 1) * (next.easeFactor || DEFAULT_EASE));
    next.status = 'review';
  }

  next.easeFactor = Math.max(
    MIN_EASE,
    Math.min(MAX_EASE, (next.easeFactor || DEFAULT_EASE) + (0.1 - (5 - clampedQuality) * (0.08 + (5 - clampedQuality) * 0.02)))
  );

  const due = new Date();
  due.setDate(due.getDate() + next.interval);
  next.dueDate = due.toISOString();

  return next;
}

export function isDue(card) {
  if (!card.dueDate) return true;
  return new Date(card.dueDate) <= new Date();
}

export function getDueCards(cards) {
  return cards.filter(isDue).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

export function getStats(cards) {
  const due = getDueCards(cards);
  const newCards = cards.filter(c => c.status === 'new');
  const learning = cards.filter(c => c.status === 'learning');
  const mature = cards.filter(c => c.status === 'review' && c.repetitions >= 3);
  return { due: due.length, new: newCards.length, learning: learning.length, mature: mature.length, total: cards.length };
}
