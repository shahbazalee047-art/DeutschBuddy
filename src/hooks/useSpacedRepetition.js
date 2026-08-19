import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { extractVocabulary } from '../utils/vocabExtractor';
import { createCard, reviewCard, getDueCards, getStats } from '../utils/srs';
import { getUserStorageKey } from '../utils/userStorage';

function loadStoredCards(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveStoredCards(storageKey, cards) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(cards));
  } catch {
    /* ignore */
  }
}

function mergeSignature(cards) {
  return cards
    .map(c => `${c.id}|${c.german}|${c.english}|${c.pronunciation}|${c.example}|${JSON.stringify(c.review || null)}`)
    .join('\n');
}

export function useSpacedRepetition(levelData, level = 'A1', userId = 'guest') {
  const storageKey = getUserStorageKey(userId, `srs_cards_${level}`) || `db_guest_srs_cards_${level}`;
  const [cards, setCards] = useState(() => loadStoredCards(storageKey));
  const cardsRef = useRef(cards);
  const lastMergeRef = useRef(null);

  useEffect(() => { cardsRef.current = cards; }, [cards]);

  // Switching level or account must replace the in-memory deck before the
  // vocabulary merge runs; otherwise the previous learner's due cards flash
  // into the new review session.
  useEffect(() => {
    const stored = loadStoredCards(storageKey);
    cardsRef.current = stored;
    lastMergeRef.current = null;
    setCards(stored);
  }, [storageKey]);

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
    saveStoredCards(storageKey, merged);
  }, [levelData, storageKey]);

  const dueCards = useMemo(() => getDueCards(cards), [cards]);
  const stats = useMemo(() => getStats(cards), [cards]);

  const rateCard = useCallback((cardId, quality) => {
    setCards(prev => {
      const next = prev.map(c => c.id === cardId ? reviewCard(c, quality) : c);
      saveStoredCards(storageKey, next);
      return next;
    });
  }, [storageKey]);

  const resetDeck = useCallback(() => {
    if (!levelData) return;
    const fresh = extractVocabulary(levelData).map(createCard);
    setCards(fresh);
    cardsRef.current = fresh;
    saveStoredCards(storageKey, fresh);
  }, [levelData, storageKey]);

  return {
    cards,
    dueCards,
    stats,
    rateCard,
    resetDeck
  };
}
