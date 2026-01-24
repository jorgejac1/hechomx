/**
 * @fileoverview Error boundary component for catching React errors.
 * Prevents entire app from crashing by displaying fallback UI.
 * Supports custom fallback components and error callbacks.
 * @module components/common/feedback/ErrorBoundary
 */

'use client';

import { Component, ReactNode } from 'react';
import ErrorState from './ErrorState';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorState
            type="error"
            title="Algo salió mal"
            message="Hubo un error al cargar esta página. Por favor intenta de nuevo."
            onRetry={this.handleReset}
          />
        )
      );
    }

    return this.props.children;
  }
}
