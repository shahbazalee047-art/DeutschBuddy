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
      disabled={!text || isSpeaking}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isSpeaking ? 'bg-sage-400 text-forest-900 animate-pulse' : 'bg-amber-400/10 text-amber-400 hover:bg-amber-400/20'}`}
    >
      <SpeakerIcon className="w-5 h-5" />
    </button>
  );
}