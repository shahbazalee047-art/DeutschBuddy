import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Lightweight spotlight coachmark. Measures the target element (by CSS selector),
// draws a gold pulsing ring + darkened backdrop around it via a box-shadow cutout,
// and a tooltip bubble below (or above, if space is tight). The target stays
// clickable so the learner can act on the hint immediately.
//
// Dismissed via the "Got it" button, Esc, or auto-timeout. The caller is
// responsible for not re-showing it (e.g. via a localStorage flag).

const PADDING = 8;
const TOOLTIP_WIDTH = 300;
const GAP = 14;
const AUTO_DISMISS_MS = 14000;

export default function Coachmark({ targetSelector, title, body, cta = 'Got it', onClose }) {
  const [rect, setRect] = useState(null);
  const [visible, setVisible] = useState(false);

  const measure = useCallback(() => {
    const el = document.querySelector(targetSelector);
    if (!el) { setRect(null); return; }
    setRect(el.getBoundingClientRect());
  }, [targetSelector]);

  useEffect(() => {
    measure();
    // Re-measure after layout / entrance animations settle.
    const t1 = setTimeout(measure, 220);
    const t2 = setTimeout(() => setVisible(true), 260);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [measure]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 160);
  }, [onClose]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') dismiss(); }
    window.addEventListener('keydown', onKey);
    const timer = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(timer); };
  }, [dismiss]);

  if (!rect || typeof document === 'undefined') return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const belowSpace = vh - rect.bottom;
  const placeBelow = belowSpace >= 180;

  const tooltipLeft = Math.max(
    12,
    Math.min(rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2, vw - TOOLTIP_WIDTH - 12)
  );
  const tooltipTop = placeBelow ? rect.bottom + GAP : Math.max(12, rect.top - GAP - 180);

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[58]"
        >
          {/* Backdrop + spotlight ring (pointer-events-none so the target stays clickable) */}
          <div
            className="fixed pointer-events-none rounded-[var(--radius-card)] ring-4 ring-gold"
            style={{
              left: rect.left - PADDING,
              top: rect.top - PADDING,
              width: rect.width + PADDING * 2,
              height: rect.height + PADDING * 2,
              boxShadow: '0 0 0 9999px rgba(15, 20, 32, 0.55)',
              animation: 'coachmarkPulse 1.8s ease-in-out infinite',
            }}
          />
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: placeBelow ? -8 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="fixed db-card p-4"
            style={{ left: tooltipLeft, top: tooltipTop, width: TOOLTIP_WIDTH }}
            onClick={e => e.stopPropagation()}
          >
            {/* Arrow */}
            <div
              className="absolute w-4 h-4 rotate-45 bg-bg-white border-border"
              style={
                placeBelow
                  ? { top: -8, left: Math.min(Math.max(rect.left + rect.width / 2 - tooltipLeft - 8, 16), TOOLTIP_WIDTH - 32), borderTop: '1px solid var(--border-default)', borderLeft: '1px solid var(--border-default)' }
                  : { bottom: -8, left: Math.min(Math.max(rect.left + rect.width / 2 - tooltipLeft - 8, 16), TOOLTIP_WIDTH - 32), borderBottom: '1px solid var(--border-default)', borderRight: '1px solid var(--border-default)' }
              }
            />
            <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold mb-1.5">{title}</p>
            <p className="text-sm leading-relaxed text-text-body mb-3.5">{body}</p>
            <div className="flex justify-end">
              <button
                onClick={dismiss}
                className="db-btn db-btn-primary px-5 py-2 text-xs"
              >
                {cta}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
