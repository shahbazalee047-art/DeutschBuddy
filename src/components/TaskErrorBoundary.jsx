import { Component } from 'react';

// Localized error boundary for a single task. If a task's content is malformed
// and crashes during render, this shows a friendly "skip" fallback instead of
// taking down the whole lesson/session. The global ErrorBoundary still catches
// anything that escapes; this just keeps one bad task from ruining a session.
export default class TaskErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Task crashed:', error);
  }

  handleSkip = () => {
    this.setState({ hasError: false });
    this.props.onSkip?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <p className="text-text-muted mb-4">This task couldn’t load, but you can keep going.</p>
          <button onClick={this.handleSkip} className="btn-primary px-6">Skip &amp; Continue</button>
        </div>
      );
    }
    return this.props.children;
  }
}
