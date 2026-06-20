import { useSpeech } from '../hooks/useSpeech';
import { IconSpeaker, IconSpeakerX } from './Icons';

export default function SpeakerButton({ text, language = 'de-DE', onAudioEnd, onAudioError }) {
  const { isSpeaking, error, speak, stop } = useSpeech(language, onAudioEnd, onAudioError);

  const handleToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  const SpeakerIcon = isSpeaking ? IconSpeakerX : IconSpeaker;

  return (
    <button
      onClick={handleToggle}
      disabled={!text}
      title={error ? 'Speech unavailable' : isSpeaking ? 'Stop' : 'Listen'}
      aria-label={error ? 'Speech unavailable' : isSpeaking ? 'Stop speaking' : 'Listen'}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isSpeaking ? 'bg-gold text-text-on-dark animate-pulse' : 'bg-gold-light/10 text-gold-light hover:bg-gold-light/20'}`}
    >
      <SpeakerIcon className="w-5 h-5" />
    </button>
  );
}
