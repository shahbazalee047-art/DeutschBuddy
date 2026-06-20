import { Component } from 'react';
import { IconWarning, IconRefresh, IconArrowLeft, IconHome } from './Icons';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      const errorMessage = error?.message || 'Unknown error';
      const errorName = error?.name || 'Error';
      const showDetails = import.meta.env.DEV;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-bg-primary">
          <div className="paper-card p-8 max-w-lg w-full">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-error/10">
                <IconWarning className="w-10 h-10 text-error" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Something went wrong
              </h2>
              <p className="text-sm text-text-muted mb-6">
                We encountered an unexpected error. You can try again, reload the page, or return home.
              </p>

              {showDetails && (
                <div className="mb-6 text-left bg-bg-secondary border border-border overflow-hidden">
                  <div className="px-4 py-2 border-b border-border bg-bg-secondary/80">
                    <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Error Details</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-error font-mono break-words">{errorName}: {errorMessage}</p>
                    {errorInfo?.componentStack && (
                      <pre className="text-[10px] text-text-muted font-mono whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                        {errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={this.handleRetry}
                  className="btn-primary flex items-center gap-2"
                >
                  <IconRefresh className="w-4 h-4" /> Try Again
                </button>
                <button
                  onClick={this.handleReload}
                  className="btn-secondary flex items-center gap-2"
                >
                  <IconArrowLeft className="w-4 h-4" /> Reload
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="btn-secondary flex items-center gap-2"
                >
                  <IconHome className="w-4 h-4" /> Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
