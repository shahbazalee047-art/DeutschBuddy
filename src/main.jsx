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
    window.location.reload();
  }
});

// Force unregister any stale service worker to prevent caching issues
if ('serviceWorker' in navigator && !sessionStorage.getItem('sw_cleared')) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    if (regs.length > 0) {
      sessionStorage.setItem('sw_cleared', '1');
      Promise.all(regs.map((r) => r.unregister())).then(() => window.location.reload());
    }
  });
} else if ('serviceWorker' in navigator && 'https:' === window.location.protocol) {
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
