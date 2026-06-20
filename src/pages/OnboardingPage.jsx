import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconFlag, IconCalendar, IconTrophy, IconTarget, IconBook } from '../components/Icons';

const slides = [
  {
    icon: IconFlag,
    title: 'Learn German the Fun Way!',
    description: 'Master German with structured lessons, gamification, and community support.',
    accent: 'var(--gold)',
  },
  {
    icon: IconCalendar,
    title: '8-Week Structured Curriculum',
    description: 'From A1 to A2 with clear milestones and progress tracking.',
    accent: 'var(--gold-light)',
  },
  {
    icon: IconTrophy,
    title: 'Earn Badges & Maintain Streaks',
    description: 'Stay motivated with XP points, daily streaks, and achievement badges.',
    accent: 'var(--gold-light)',
  },
];

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const navigate = useNavigate();

  function handleNext() {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    else setShowLevelSelect(true);
  }

  function handleSkip() { setShowLevelSelect(true); }

  function handleContinue() {
    if (selectedLevel) navigate('/dashboard');
  }

  if (showLevelSelect) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-bg-dark">
        <h2 className="text-3xl font-bold text-text-on-dark mb-2 text-center" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Select Your Starting Level</h2>
        <p className="text-text-on-dark-muted mb-8 text-center" style={{ fontSize: '16px' }}>Choose based on your current German proficiency</p>

        <div className="w-full max-w-md space-y-4 mb-8">
          <button onClick={() => setSelectedLevel('A1')}
            className={`w-full p-6 border-2 text-left transition-all active:scale-[0.98] ${
              selectedLevel === 'A1' ? 'border-gold bg-gold/10 shadow-lg shadow-gold/10' : 'paper-card hover:border-gold/30'
            }`}>
            <div className="flex items-center gap-4">
              <IconTarget className="w-8 h-8 text-gold" />
              <div>
                <h3 className="text-lg font-bold text-text-on-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>A1 - Beginner</h3>
                <p className="text-[13px] text-text-muted mt-1">Complete beginner? Start here. Learn alphabet, greetings, basic grammar.</p>
              </div>
            </div>
          </button>
          <button onClick={() => setSelectedLevel('A2')}
            className={`w-full p-6 border-2 text-left transition-all active:scale-[0.98] ${
              selectedLevel === 'A2' ? 'border-gold bg-gold/10 shadow-lg shadow-gold/10' : 'paper-card hover:border-gold/30'
            }`}>
            <div className="flex items-center gap-4">
              <IconBook className="w-8 h-8 text-gold" />
              <div>
                <h3 className="text-lg font-bold text-text-on-dark" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>A2 - Elementary</h3>
                <p className="text-[13px] text-text-muted mt-1">Know some German? Test into A2. Past tenses, complex sentences, travel vocabulary.</p>
              </div>
            </div>
          </button>
        </div>

        <button onClick={handleContinue} disabled={!selectedLevel}
          className="btn-primary w-full max-w-md disabled:opacity-40 disabled:cursor-not-allowed">Continue</button>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-bg-dark">
      <div className="w-full max-w-md text-center">
        <slide.icon className="w-24 h-24 mx-auto mb-8 text-gold animate-float" />
        <h1 className="text-3xl font-bold text-text-dark mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '-0.5px' }}>{slide.title}</h1>
        <p className="text-text-muted mb-10" style={{ fontSize: '16px', lineHeight: '1.6' }}>{slide.description}</p>

        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? 'w-8' : 'bg-bg-secondary'}`}
              style={i === currentSlide ? { background: slide.accent } : {}} />
          ))}
        </div>

        <button onClick={handleNext} className="btn-primary w-full mb-4 active:scale-95">
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
        <button onClick={handleSkip} className="btn-text w-full text-text-muted hover:text-text-body">Skip</button>
      </div>
    </div>
  );
}
