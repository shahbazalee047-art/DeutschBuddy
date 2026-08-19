import { memo } from 'react';

const BuddySpeechBubble = memo(function BuddySpeechBubble({
  children,
  position = 'top',
  className = '',
  tone = 'neutral'
}) {
  const toneStyles = {
    neutral: 'bg-white border-db-border !text-db-text-dark',
    success: 'bg-db-success-light border-db-success/20 text-db-text-dark',
    encourage: 'bg-db-accent-light border-db-accent/30 text-db-text-dark',
    error: 'bg-db-error-light border-db-error/20 text-db-text-dark'
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  // Let callers own display utilities. Keeping `inline-block` in the base
  // class would override a consumer's `hidden sm:block` at narrow widths.
  return (
    <div className={`relative ${className || 'inline-block'}`}>
      <div
        className={`
          absolute z-10 whitespace-nowrap px-3 py-2 rounded-xl text-sm font-medium
          border shadow-db-card ${toneStyles[tone]} ${positionClasses[position]}
        `}
        role="status"
        aria-live="polite"
        style={{ color: '#2F2F2F' }}
      >
        {children}
        <span
          className={`
            absolute w-3 h-3 bg-current border-l border-b transform rotate-45
            ${position === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2 border-db-border' : ''}
            ${position === 'bottom' ? 'top-[-6px] left-1/2 -translate-x-1/2 border-t border-r border-l-0 border-b-0 border-db-border' : ''}
            ${position === 'left' ? 'right-[-6px] top-1/2 -translate-y-1/2 border-t border-r border-l-0 border-b-0 border-db-border' : ''}
            ${position === 'right' ? 'left-[-6px] top-1/2 -translate-y-1/2 border-b border-l border-t-0 border-r-0 border-db-border' : ''}
          `}
          style={{
            backgroundColor: tone === 'success' ? 'var(--db-success-light)' :
                            tone === 'encourage' ? 'var(--db-accent-light)' :
                            tone === 'error' ? 'var(--db-error-light)' : 'white',
            borderColor: 'var(--db-border)'
          }}
        />
      </div>
    </div>
  );
});

export default BuddySpeechBubble;
