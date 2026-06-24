import { useState } from 'react';
import { Volume2 } from 'lucide-react';

export default function FlashcardSystem({ word = "aufstehen", phonetic = "/aʊfˌʃteːən/", translation = "to get up / to stand up", example = "Ich stehe um 7 Uhr auf", remaining = 14, onRateCard }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleRating = (rating) => {
    if(onRateCard) onRateCard(rating);
    setIsRevealed(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col h-[600px]">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Flashcards</span>
        <span className="text-sm font-medium text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">{remaining} remaining today</span>
      </div>
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col relative shadow-xl">
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <h2 className="text-5xl font-bold text-white tracking-tight">{word}</h2>
          <p className="text-lg text-slate-400 font-mono">{phonetic}</p>
          <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-full mt-4">
            <Volume2 size={20}/> Hear it
          </button>
        </div>
        {isRevealed && <div className="w-full h-px bg-slate-800 my-6" />}
        {isRevealed ? (
          <div className="flex-1 flex flex-col items-center space-y-4 animate-in slide-in-from-bottom-4 fade-in">
            <h3 className="text-2xl font-medium text-slate-200 text-center">{translation}</h3>
            <p className="text-slate-400 text-center italic">"{example}"</p>
          </div>
        ) : (
          <div className="flex-1 flex items-end justify-center pb-4">
            <button onClick={() => setIsRevealed(true)} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-colors">Tap to reveal</button>
          </div>
        )}
      </div>
      {isRevealed && (
        <div className="grid grid-cols-4 gap-2 mt-6 animate-in slide-in-from-bottom-4 fade-in">
          <button onClick={() => handleRating('again')} className="flex flex-col items-center p-3 bg-slate-900 border border-red-900/50 hover:bg-slate-800 rounded-xl transition-colors group">
            <span className="text-red-500 font-bold text-lg group-hover:scale-110 transition-transform">Again</span>
            <span className="text-xs text-slate-500 mt-1">{'<'} 1m</span>
          </button>
          <button onClick={() => handleRating('hard')} className="flex flex-col items-center p-3 bg-slate-900 border border-orange-900/50 hover:bg-slate-800 rounded-xl transition-colors group">
            <span className="text-orange-500 font-bold text-lg group-hover:scale-110 transition-transform">Hard</span>
            <span className="text-xs text-slate-500 mt-1">10m</span>
          </button>
          <button onClick={() => handleRating('good')} className="flex flex-col items-center p-3 bg-slate-900 border border-emerald-900/50 hover:bg-slate-800 rounded-xl transition-colors group">
            <span className="text-emerald-500 font-bold text-lg group-hover:scale-110 transition-transform">Good</span>
            <span className="text-xs text-slate-500 mt-1">1d</span>
          </button>
          <button onClick={() => handleRating('easy')} className="flex flex-col items-center p-3 bg-slate-900 border border-blue-900/50 hover:bg-slate-800 rounded-xl transition-colors group">
            <span className="text-blue-500 font-bold text-lg group-hover:scale-110 transition-transform">Easy</span>
            <span className="text-xs text-slate-500 mt-1">4d</span>
          </button>
        </div>
      )}
    </div>
  );
}