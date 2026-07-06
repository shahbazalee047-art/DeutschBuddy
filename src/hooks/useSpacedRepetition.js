import { useState, useEffect, useCallback, useMemo } from 'react';
import { extractVocabulary } from '../utils/vocabExtractor';
import { createCard, reviewCard, getDueCards, getStats } from '../utils/srs';

const STORAGE_KEY = 'db_srs_cards';

function loadStoredCards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredCards(cards) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {
    /* ignore */
  }
}

export function useSpacedRepetition(levelData) {
  const [cards, setCards] = useState(() => loadStoredCards());

  // Sync vocabulary items with stored cards.
  useEffect(() => {
    if (!levelData) return;
    const vocab = extractVocabulary(levelData);
    if (vocab.length === 0) return;

    setCards(prev => {
      const existingById = new Map(prev.map(c => [c.id, c]));
      const merged = vocab.map(item => {
        const existing = existingById.get(item.id);
        return existing ? { ...existing, german: item.german, english: item.english, pronunciation: item.pronunciation, example: item.example } : createCard(item);
      });
      saveStoredCards(merged);
      return merged;
    });
  }, [levelData]);

  const dueCards = useMemo(() => getDueCards(cards), [cards]);
  const stats = useMemo(() => getStats(cards), [cards]);

  const rateCard = useCallback((cardId, quality) => {
    setCards(prev => {
      const next = prev.map(c => c.id === cardId ? reviewCard(c, quality) : c);
      saveStoredCards(next);
      return next;
    });
  }, []);

  const resetDeck = useCallback(() => {
    if (!levelData) return;
    const fresh = extractVocabulary(levelData).map(createCard);
    setCards(fresh);
    saveStoredCards(fresh);
  }, [levelData]);

  return {
    cards,
    dueCards,
    stats,
    rateCard,
    resetDeck
  };
}
