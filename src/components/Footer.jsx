import { IconHeart } from './Icons';
export default function Footer() {
  return (
    <footer className="text-center py-6 bg-bg-darkest border-t border-border mt-8" role="contentinfo">
      <p className="flex items-center justify-center gap-1 text-[11px] text-[#B8B2AC]">Made with <IconHeart className="h-3 w-3 text-accent" /> by Shahbaz Ali</p>
    </footer>
  );
}
