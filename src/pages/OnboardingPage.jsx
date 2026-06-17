import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    icon: '🇩🇪',
    title: 'Learn German the Fun Way!',
    description: 'Master German with structured lessons, gamification, and community support.',
    accent: '#B8860B',
  },
  {
    icon: '📅',
    title: '8-Week Structured Curriculum',
    description: 'From A1 to A2 with clear milestones and progress tracking.',
    accent: '#2D8B7A',
  },
  {
    icon: '🏆',
    title: 'Earn Badges & Maintain Streaks',
    description: 'Stay motivated with XP points, daily streaks, and achievement badges.',
    accent: '#FF9800',
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F0] px-6 py-12">
        <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Your Starting Level</h2>
        <p className="text-[#8A8A9A] mb-8 text-center" style={{ fontSize: '16px' }}>Choose based on your current German proficiency</p>

        <div className="w-full max-w-md space-y-4 mb-8">
          <button onClick={() => setSelectedLevel('A1')}
            className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
              selectedLevel === 'A1' ? 'border-[#B8860B] bg-[#FFF8E1] shadow-lg shadow-[#B8860B]/10' : 'paper-card hover:shadow-md'
            }`}>
            <div className="flex items-center gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="text-lg font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>A1 - Beginner</h3>
                <p className="text-[13px] text-[#8A8A9A] mt-1">Complete beginner? Start here. Learn alphabet, greetings, basic grammar.</p>
              </div>
            </div>
          </button>
          <button onClick={() => setSelectedLevel('A2')}
            className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
              selectedLevel === 'A2' ? 'border-[#B8860B] bg-[#FFF8E1] shadow-lg shadow-[#B8860B]/10' : 'paper-card hover:shadow-md'
            }`}>
            <div className="flex items-center gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <h3 className="text-lg font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>A2 - Elementary</h3>
                <p className="text-[13px] text-[#8A8A9A] mt-1">Know some German? Test into A2. Past tenses, complex sentences, travel vocabulary.</p>
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F0] px-6 py-12">
      <div className="w-full max-w-md text-center">
        <div className="text-7xl mb-8 animate-float">{slide.icon}</div>
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.5px' }}>{slide.title}</h1>
        <p className="text-[#8A8A9A] mb-10" style={{ fontSize: '16px', lineHeight: '1.6' }}>{slide.description}</p>

        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? 'w-8' : ''}`}
              style={{ background: i === currentSlide ? slide.accent : '#E8E0D4' }} />
          ))}
        </div>

        <button onClick={handleNext} className="btn-primary w-full mb-4">
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
        <button onClick={handleSkip} className="btn-text w-full text-[#8A8A9A] hover:text-[#4A4A5A]">Skip</button>
      </div>
    </div>
  );
}
