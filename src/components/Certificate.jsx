import { IconCertificate } from './Icons';

export default function Certificate() {
  return (
    <div className="paper-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <IconCertificate className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-bold text-text-body" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Certificate
        </h3>
      </div>
      <div className="p-4 border border-gold/20 bg-bg-secondary">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-text-dark mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            DeutschBuddy Certificate
          </div>
          <div className="text-xs text-text-muted uppercase tracking-wider" style={{ letterSpacing: '0.5px' }}>
            Awarded to the learner
          </div>
        </div>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Module:</span>
            <span className="text-text-body">Intermediate A2</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Completion:</span>
            <span className="text-text-body">100%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">XP Earned:</span>
            <span className="text-text-body">850 XP</span>
          </div>
        </div>
        <div className="text-center pt-4 border-t border-gold/10">
          <div className="text-xs text-text-muted mb-2">Date: <span className="text-text-body">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span></div>
          <button onClick={() => window.print()} className="btn-primary text-sm px-4 py-2">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}