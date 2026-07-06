import '@testing-library/jest-dom';

// Minimal localStorage mock for tests
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; },
    clear() { this.store = {}; },
  },
  writable: true,
});

// Suppress console.error in tests unless explicitly wanted
const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/i.test(args[0])) return;
  originalError(...args);
};
