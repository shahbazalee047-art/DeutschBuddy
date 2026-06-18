import { IconCertificate } from './Icons';

export default function Certificate() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <IconCertificate className="w-5 h-5 text-sage-400" />
        <h3 className="text-lg font-bold text-cream-200" style={{ fontFamily: 'DM Serif Display, serif' }}>
          Certificate
        </h3>
      </div>
      <div className="p-4 rounded-xl border border-sage-400/20 bg-[#0D1A14]/40">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-cream-100 mb-1" style={{ fontFamily: 'DM Serif Display, serif' }}>
            DeutschBuddy Certificate
          </div>
          <div className="text-xs text-cream-500 uppercase tracking-wider" style={{ letterSpacing: '0.5px' }}>
            Awarded to the learner
          </div>
        </div>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-cream-500">Module:</span>
            <span className="text-cream-200">Intermediate A2</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cream-500">Completion:</span>
            <span className="text-cream-200">100%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cream-500">XP Earned:</span>
            <span className="text-cream-200">850 XP</span>
          </div>
        </div>
        <div className="text-center pt-4 border-t border-sage-400/10">
          <div className="text-xs text-cream-500 mb-2">Date: <span className="text-cream-200">June 2026</span></div>
          <button className="px-4 py-2 rounded-lg bg-sage-400 text-forest-900 text-sm font-medium hover:bg-sage-400/90 transition-all duration-200">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}