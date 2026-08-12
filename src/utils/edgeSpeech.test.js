import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { speakWithEdgeTTS, clearAudioCache } from './edgeSpeech';

describe('speakWithEdgeTTS', () => {
  const blob = new Blob(['audio-data'], { type: 'audio/mpeg' });

  beforeEach(() => {
    clearAudioCache();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      blob: async () => blob,
    })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches the first time a phrase is requested', async () => {
    const result = await speakWithEdgeTTS('Hallo', 'de-DE-KatjaNeural');
    expect(result).toBeInstanceOf(Blob);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/tts'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('replays identical phrases from cache without refetching', async () => {
    const first = await speakWithEdgeTTS('Hallo', 'de-DE-KatjaNeural', '+0%');
    const second = await speakWithEdgeTTS('Hallo', 'de-DE-KatjaNeural', '+0%');
    expect(second).toBe(first);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('shares one in-flight request across concurrent identical calls', async () => {
    const [first, second] = await Promise.all([
      speakWithEdgeTTS('Hallo', 'de-DE-KatjaNeural'),
      speakWithEdgeTTS('Hallo', 'de-DE-KatjaNeural'),
    ]);
    expect(first).toBe(second);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('treats different text, voice, or rate as distinct cache entries', async () => {
    await speakWithEdgeTTS('Hallo', 'de-DE-KatjaNeural', '+0%');
    await speakWithEdgeTTS('Hallo', 'de-DE-KatjaNeural', '-25%');
    await speakWithEdgeTTS('Hallo', 'de-DE-ConradNeural', '+0%');
    await speakWithEdgeTTS('Tschüss', 'de-DE-KatjaNeural', '+0%');
    expect(fetch).toHaveBeenCalledTimes(4);
  });

  it('propagates the abort signal to fetch', async () => {
    const controller = new AbortController();
    await speakWithEdgeTTS('Hallo', 'de-DE-KatjaNeural', '+0%', '+0Hz', '+0%', controller.signal);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/tts'),
      expect.objectContaining({ signal: controller.signal })
    );
  });

  it('throws when the server responds with an error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: false,
      status: 500,
      json: async () => ({ error: 'TTS generation failed' }),
    })));
    await expect(speakWithEdgeTTS('Hallo', 'de-DE-KatjaNeural')).rejects.toThrow(/TTS generation failed/);
  });
});
