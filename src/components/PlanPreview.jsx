import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconClock, IconBookOpen } from './Icons';
import { getRecommendedLevel, getSuggestedTrack } from '../utils/onboardingTracks';

export default function PlanPreview({ experience = 'zero', pace = 'steady', onComplete }) {
  const navigate = useNavigate();
  const recommendedLevel = getRecommendedLevel(experience);
  const suggestedTrack = getSuggestedTrack(pace);

  const [selectedTrack, setSelectedTrack] = useState(suggestedTrack);

  const isA1 = recommendedLevel === 'A1';
  const trackOptions = isA1
    ? [
        { id: 'standard', label: 'A1 Standard', detail: '8 weeks · full coverage', icon: IconBookOpen },
        { id: 'fast-track', label: 'A1 Fast Track', detail: '4–6 weeks · merged review days', icon: IconClock },
      ]
    : [
        { id: 'standard', label: 'A2 Standard', detail: '8 weeks · full coverage', icon: IconBookOpen },
      ];

  function handleContinue() {
    try {
      localStorage.setItem('db_selected_level', recommendedLevel);
      localStorage.setItem('db_selected_track', selectedTrack);
    } catch { /* ignore */ }
    if (onComplete) {
      onComplete({ level: recommendedLevel, track: selectedTrack });
    } else {
      navigate('/dashboard', { replace: true });
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-[10px] font-bold uppercase tracking-[2px] mb-4" style={{ color: '#E8B73D' }}>Your Learning Plan</div>
        <h2 className="text-[var(--text-h1)] font-bold mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F0EAE0' }}>
          Based on your answers, {recommendedLevel} looks right for you
        </h2>
        <p className="text-[15px]" style={{ color: '#B8B2AC' }}>
          Choose the track that fits your schedule. You can switch later from settings.
        </p>
      </div>

      <div className={`grid gap-5 mb-8 ${trackOptions.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-1'}`}>
        {trackOptions.map(option => {
          const isSelected = selectedTrack === option.id;
          const isSuggested = suggestedTrack === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setSelectedTrack(option.id)}
              className="text-left transition-all active:scale-[0.99] relative"
              style={{
                background: isSelected ? '#2E2A26' : '#262320',
                border: isSelected ? '1.5px solid #E8B73D' : '1px solid #3A3530',
                borderRadius: 'var(--radius-card)',
                padding: '24px',
              }}
            >
              {isSuggested && (
                <span
                  className="absolute -top-3 left-4 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: '#E8B73D', color: '#1C1A19', borderRadius: 'var(--radius-sm)' }}
                >
                  Suggested
                </span>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ background: isSelected ? 'rgba(232,183,61,0.15)' : 'rgba(58,53,48,0.35)', color: isSelected ? '#E8B73D' : '#B8B2AC', borderRadius: 'var(--radius-sm)' }}
                >
                  <option.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#F0EAE0' }}>{option.label}</h3>
                  <p className="text-[13px]" style={{ color: '#B8B2AC' }}>{option.detail}</p>
                </div>
              </div>
              <ul className="space-y-1.5">
                {(option.id === 'standard' ? [
                  'Complete A1/A2 fundamentals',
                  'Daily bite-sized lessons',
                  'Built-in review days',
                ] : [
                  'Compressed A1 curriculum',
                  'Merged review sessions',
                  'Best for motivated learners',
                ]).map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px]" style={{ color: '#B8B2AC' }}>
                    <IconCheck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: isSelected ? '#E8B73D' : '#8C857C' }} /> {item}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <p className="text-center text-[12px] mb-6" style={{ color: '#8C857C' }}>
        You can switch tracks anytime from settings.
      </p>

      <button
        onClick={handleContinue}
        className="w-full py-3.5 text-[12px] font-bold uppercase tracking-[1.5px] transition-transform active:scale-95"
        style={{ background: '#E8B73D', color: '#1C1A19', borderRadius: 'var(--radius-button)' }}
      >
        Create account
      </button>

      <div className="mt-4 text-center">
        <span style={{ color: '#8C857C' }}>Already have one? </span>
        <button onClick={() => navigate('/login')} className="font-semibold hover:underline transition" style={{ color: '#8C857C' }}>Log in</button>
      </div>
    </div>
  );
}