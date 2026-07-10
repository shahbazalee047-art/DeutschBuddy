import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './contexts/ThemeContext'
import './index.css'
import App from './App.jsx'

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('Failed to fetch dynamically imported module')) {
    event.preventDefault();
    // Guard against an infinite reload loop when the deployed chunk itself is
    // broken: reload at most once per session, then leave the rejection alone.
    try {
      if (sessionStorage.getItem('db_chunk_reload_attempted') === '1') return;
      sessionStorage.setItem('db_chunk_reload_attempted', '1');
    } catch { /* ignore */ }
    window.location.reload();
  }
});

// Register service worker for PWA support without aggressive unregister/reload.
// Cache versioning in sw.js handles updates naturally via skipWaiting.
if ('serviceWorker' in navigator && 'https:' === window.location.protocol) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
