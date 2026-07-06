import { describe, it, expect } from 'vitest';
import a1Data from './a1Data';

describe('A1 curriculum data', () => {
  it('has 8 weeks', () => {
    expect(a1Data.weeks.length).toBe(8);
  });

  it('each week has 7 days', () => {
    a1Data.weeks.forEach(week => {
      expect(week.days.length).toBe(7);
    });
  });

  it('weeks 3-8 have populated tasks with content', () => {
    const laterWeeks = a1Data.weeks.slice(2);
    laterWeeks.forEach(week => {
      week.days.forEach(day => {
        expect(day.tasks.length).toBeGreaterThan(0);
        day.tasks.forEach(task => {
          expect(task.id).toBeTruthy();
          expect(task.type).toBeTruthy();
          expect(task.content).toBeDefined();
        });
      });
    });
  });

  it('vocabulary tasks have items', () => {
    const vocabTasks = a1Data.weeks
      .flatMap(w => w.days)
      .flatMap(d => d.tasks)
      .filter(t => t.type === 'vocabulary');
    expect(vocabTasks.length).toBeGreaterThan(0);
    vocabTasks.forEach(t => {
      expect(Array.isArray(t.content.items)).toBe(true);
      expect(t.content.items.length).toBeGreaterThan(0);
    });
  });
});
