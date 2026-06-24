import { IconHeart } from './Icons';
export default function Footer() {
  return (
    <footer className="text-center py-6 bg-bg-darkest border-t border-border mt-8" role="contentinfo">
      <p className="text-[11px] text-[#B8B2AC] flex items-center justify-center gap-1">Made with <IconHeart className="w-3 h-3 text-gold" /> by Shahbaz Ali</p>
    </footer>
  );
}
