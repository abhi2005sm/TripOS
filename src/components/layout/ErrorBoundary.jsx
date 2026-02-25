import React, { Component } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Button from '../ui/Button';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 text-center">
                    <div className="max-w-md w-full">
                        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                            <AlertTriangle className="text-red-400" size={40} />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h1>
                        <p className="text-text-secondary mb-8 leading-relaxed">
                            We've encountered an unexpected error. Don't worry, our team has been notified.
                            Try refreshing the page or head back home.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                className="flex items-center gap-2"
                                onClick={() => window.location.reload()}
                            >
                                <RefreshCcw size={18} />
                                Refresh Page
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex items-center gap-2"
                                onClick={() => window.location.href = '/'}
                            >
                                <Home size={18} />
                                Back Home
                            </Button>
                        </div>
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mt-12 text-left bg-black/40 rounded-xl p-4 border border-white/5 overflow-auto max-h-40">
                                <p className="text-xs font-mono text-red-400/80 whitespace-pre-wrap">
                                    {this.state.error && this.state.error.toString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
