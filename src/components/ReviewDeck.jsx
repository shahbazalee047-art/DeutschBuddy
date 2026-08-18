import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import { BuddyAvatar, BuddySpeechBubble, BuddyEmptyState } from './buddy';
import SpeakerButton from './SpeakerButton';


const RATING_LABELS = [
  { quality: 0, label: 'Again', tone: 'error', color: 'bg-db-error text-white' },
  { quality: 3, label: 'Hard', tone: 'encourage', color: 'bg-db-gold text-db-text-dark' },
  { quality: 4, label: 'Good', tone: 'success', color: 'bg-db-success text-white' },
  { quality: 5, label: 'Easy', tone: 'success', color: 'bg-db-primary text-white' }
];

export default function ReviewDeck({ levelData }) {
  const { dueCards, stats, rateCard, resetDeck } = useSpacedRepetition(levelData);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [buddyState, setBuddyState] = useState('idle');
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');

  const currentCard = dueCards[index];
  const isComplete = index >= dueCards.length;
  // Double-tap on a rating button must not rate/advance the card twice
  // (rateCard would re-schedule a card that already left the queue).
  const lastRatedRef = useRef(-1);
  const bubbleTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(bubbleTimerRef.current), []);

  const showBuddyReaction = useCallback((state, text, duration = 1500) => {
    setBuddyState(state);
    setBubbleText(text);
    setShowBubble(true);
    clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => setShowBubble(false), duration);
  }, []);

  const handleRate = useCallback((quality) => {
    if (!currentCard) return;
    if (lastRatedRef.current === index) return;
    lastRatedRef.current = index;
    rateCard(currentCard.id, quality);

    if (quality >= 4) {
      showBuddyReaction('happy', quality === 5 ? 'Easy! Super!' : 'Gut gemacht!');
    } else if (quality === 3) {
      showBuddyReaction('encourage', 'Hard, but you got it!');
    } else {
      showBuddyReaction('encourage', 'Nicht schlimm, review soon!');
    }

    setFlipped(false);
    setIndex(prev => prev + 1);
  }, [currentCard, index, rateCard, showBuddyReaction]);

  if (dueCards.length === 0) {
    return (
      <div className="min-h-full bg-bg-base px-4 py-6 pb-24 lg:pb-6">
        <BuddyEmptyState
          title="All caught up!"
          message="No vocabulary is due for review right now. Great job!"
          actionLabel="Reset Deck"
          onAction={resetDeck}
          buddyState="happy"
        />
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-full bg-bg-base px-4 py-6 pb-24 lg:pb-6 flex flex-col items-center justify-center text-center">
        <BuddyAvatar state="celebrate" size={140} />
        <h2 className="text-2xl font-bold text-text-dark mt-4 mb-2">Session Complete!</h2>
        <p className="text-text-muted mb-6">You reviewed {dueCards.length} cards.</p>
        <div className="flex gap-3">
          <button onClick={() => setIndex(0)} className="db-btn db-btn-primary">
            Review Again
          </button>
          <button onClick={resetDeck} className="db-btn db-btn-secondary">
            Reset Deck
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-bg-base px-4 py-6 pb-24 lg:pb-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BuddyAvatar state={buddyState} size={56} />
            {showBubble && (
              <BuddySpeechBubble position="right" tone={buddyState === 'happy' ? 'success' : 'encourage'}>
                {bubbleText}
              </BuddySpeechBubble>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted">Due today</p>
            <p className="text-lg font-bold text-text-dark tabular-nums">{dueCards.length - index} left</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <StatBox label="New" value={stats.new} color="bg-db-primary-light text-primary" />
          <StatBox label="Learning" value={stats.learning} color="bg-db-gold-light text-db-gold" />
          <StatBox label="Review" value={stats.due} color="bg-db-success-light text-success" />
          <StatBox label="Mature" value={stats.mature} color="bg-db-accent-light text-accent" />
        </div>

        {/* Card */}
        <div
          className="relative h-80 w-full cursor-pointer perspective-1000"
          onClick={() => setFlipped(!flipped)}
          role="button"
          aria-label="Flip card"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id + (flipped ? '-back' : '-front')}
              initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 db-card flex flex-col items-center justify-center p-8 text-center"
            >
              {!flipped ? (
                <>
                  <p className="text-sm text-text-muted mb-4">German</p>
                  <h3 className="text-3xl font-bold text-text-dark mb-4">{currentCard.german}</h3>
                  {currentCard.pronunciation && (
                    <p className="text-sm text-text-muted italic">/{currentCard.pronunciation}/</p>
                  )}
                  <div className="absolute bottom-4 right-4" onClick={e => e.stopPropagation()}>
                    <SpeakerButton text={currentCard.german} size="sm" />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-text-muted mb-4">English</p>
                  <h3 className="text-2xl font-bold text-text-dark mb-4">{currentCard.english}</h3>
                  {currentCard.example && (
                    <p className="text-sm text-text-muted">{currentCard.example}</p>
                  )}
                  <div className="absolute bottom-4 right-4" onClick={e => e.stopPropagation()}>
                    <SpeakerButton text={currentCard.german} size="sm" />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-text-muted mt-3 mb-6">Tap card to flip</p>

        {/* Rating buttons */}
        {flipped ? (
          <div className="grid grid-cols-4 gap-2">
            {RATING_LABELS.map(({ quality, label, color }) => (
              <button
                key={quality}
                onClick={() => handleRate(quality)}
                className={`${color} py-3 rounded-xl font-semibold text-sm transition-transform active:scale-95`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => setFlipped(true)}
            className="w-full db-btn db-btn-primary"
          >
            Show Answer
          </button>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className={`rounded-xl p-2 text-center ${color}`}>
      <p className="text-lg font-bold tabular-nums">{value}</p>
      <p className="text-[10px] font-medium opacity-80">{label}</p>
    </div>
  );
}
