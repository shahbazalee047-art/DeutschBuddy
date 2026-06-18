import { Component } from 'react';
import { IconInfo } from './Icons';

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
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#18181B' }}>
          <div className="glass-card max-w-md w-full text-center p-8">
            <div className="mb-4"><IconInfo className="w-12 h-12 mx-auto text-lime-400" /></div>
            <h1 className="text-xl font-bold text-zinc-100 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Something went wrong</h1>
            <p className="text-zinc-400 text-sm mb-4">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="px-5 py-2.5 text-zinc-900 font-semibold rounded-xl transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #A3E635, #06B6D4)', boxShadow: '0 4px 12px rgba(163, 230, 53, 0.3)' }}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
