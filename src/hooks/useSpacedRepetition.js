import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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

function mergeSignature(cards) {
  return cards
    .map(c => `${c.id}|${c.german}|${c.english}|${c.pronunciation}|${c.example}|${JSON.stringify(c.review || null)}`)
    .join('\n');
}

export function useSpacedRepetition(levelData) {
  const [cards, setCards] = useState(() => loadStoredCards());
  const cardsRef = useRef(cards);
  const lastMergeRef = useRef(null);

  useEffect(() => { cardsRef.current = cards; }, [cards]);

  // Sync vocabulary items with stored cards. I/O stays OUT of the setCards
  // updater (pure-render rule) and a signature bail-out prevents an
  // apply→render→apply loop when nothing actually changed.
  useEffect(() => {
    if (!levelData) return;
    const vocab = extractVocabulary(levelData);
    if (vocab.length === 0) return;

    const prevCards = cardsRef.current;
    const existingById = new Map(prevCards.map(c => [c.id, c]));
    const merged = vocab.map(item => {
      const existing = existingById.get(item.id);
      return existing ? { ...existing, german: item.german, english: item.english, pronunciation: item.pronunciation, example: item.example } : createCard(item);
    });
    const signature = mergeSignature(merged);
    if (lastMergeRef.current === signature) return;
    lastMergeRef.current = signature;
    setCards(merged);
    saveStoredCards(merged);
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
