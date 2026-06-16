import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('ErrorBoundary:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="glass-card max-w-md w-full text-center p-8">
            <div className="text-5xl mb-4">😵</div>
            <h1 className="text-xl font-bold text-slate-100 mb-2">Something went wrong</h1>
            <p className="text-slate-500 text-sm mb-4">{this.state.error?.message || 'Unexpected error.'}</p>
            <button onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
