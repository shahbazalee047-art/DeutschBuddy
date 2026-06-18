import { Component } from 'react';
import { IconWarning } from './Icons';

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
        <div className="min-h-screen flex items-center justify-center p-4 bg-forest-900">
          <div className="glass-card p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-error/10">
              <IconWarning className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-cream-100 mb-2" style={{ fontFamily: 'DM Serif Display, serif' }}>
              Something went wrong
            </h2>
            <p className="text-sm text-cream-400 mb-6">
              We encountered an unexpected error. Please try again or contact support.
            </p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
              className="px-6 py-2 rounded-xl bg-sage-400 text-forest-900 font-semibold hover:bg-sage-400/90 transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}