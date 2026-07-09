import { describe, it, expect } from 'vitest';
import { splitTopicTitle, englishTopicTitle, germanTopicTitle, findTaskById } from './topicTitle';

describe('splitTopicTitle', () => {
  it('splits a "German — English" title on the em dash', () => {
    expect(splitTopicTitle('Das Alphabet — The Alphabet')).toEqual({
      de: 'Das Alphabet',
      en: 'The Alphabet',
    });
  });

  it('handles the longer bilingual form', () => {
    expect(splitTopicTitle('Hallo! Begrüßungen & Sich Vorstellen — Greetings & Introducing Yourself')).toEqual({
      de: 'Hallo! Begrüßungen & Sich Vorstellen',
      en: 'Greetings & Introducing Yourself',
    });
  });

  it('falls back to the whole string as English when no separator is present', () => {
    expect(splitTopicTitle('Präteritum & Weekend Talk')).toEqual({
      de: '',
      en: 'Präteritum & Weekend Talk',
    });
  });

  it('returns empty strings for empty input', () => {
    expect(splitTopicTitle('')).toEqual({ de: '', en: '' });
    expect(splitTopicTitle(null)).toEqual({ de: '', en: '' });
  });

  it('tolerates en dash and hyphen separators', () => {
    expect(splitTopicTitle('Hallo – Hello')).toEqual({ de: 'Hallo', en: 'Hello' });
    expect(splitTopicTitle('Hallo - Hello')).toEqual({ de: 'Hallo', en: 'Hello' });
  });
});

describe('englishTopicTitle / germanTopicTitle', () => {
  it('extracts the English topic name for overview views', () => {
    expect(englishTopicTitle('Vergangenheit — Past Tenses')).toBe('Past Tenses');
  });

  it('extracts the German topic name for inside-lesson display', () => {
    expect(germanTopicTitle('Vergangenheit — Past Tenses')).toBe('Vergangenheit');
  });

  it('returns empty German name when the title has no separator', () => {
    expect(germanTopicTitle('Präteritum & Weekend Talk')).toBe('');
    expect(englishTopicTitle('Präteritum & Weekend Talk')).toBe('Präteritum & Weekend Talk');
  });
});

describe('findTaskById', () => {
  const levelData = {
    weeks: [
      {
        id: 1, title: 'Eins — One',
        days: [{ day: 1, tasks: [{ id: 't1', type: 'quiz', title: 'Q1' }] }],
      },
      {
        id: 2, title: 'Zwei — Two',
        days: [{ day: 3, tasks: [{ id: 't9', type: 'fillblank', title: 'FB9' }] }],
      },
    ],
  };

  it('locates a task and returns its week/day context', () => {
    const found = findTaskById(levelData, 't9');
    expect(found).not.toBeNull();
    expect(found.task.id).toBe('t9');
    expect(found.week.id).toBe(2);
    expect(found.day.day).toBe(3);
  });

  it('returns null for an unknown id', () => {
    expect(findTaskById(levelData, 'nope')).toBeNull();
  });

  it('returns null when levelData is missing', () => {
    expect(findTaskById(null, 't1')).toBeNull();
  });
});
