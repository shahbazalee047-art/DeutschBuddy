import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #131A2E, #0B0F19)' }}>
          <div className="glass-card max-w-md w-full text-center p-8">
            <div className="text-5xl mb-4">😵</div>
            <h1 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Something went wrong</h1>
            <p className="text-slate-400 text-sm mb-4">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="px-5 py-2.5 text-white font-semibold rounded-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #B8860B, #D4A843)', boxShadow: '0 4px 12px rgba(184, 134, 11, 0.3)' }}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
