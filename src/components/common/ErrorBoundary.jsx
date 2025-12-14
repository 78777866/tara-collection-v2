import React from 'react'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error('Uncaught error:', error, errorInfo)
        this.setState({ errorInfo })
    }

    handleReload = () => {
        window.location.reload()
    }

    handleGoHome = () => {
        window.location.href = '/'
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary__content">
                        <div className="error-icon">
                            <AlertTriangle size={64} />
                        </div>
                        <h1>Something went wrong</h1>
                        <p className="error-message">
                            We apologize for the inconvenience. An unexpected error has occurred.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="error-details">
                                <p className="error-code">{this.state.error.toString()}</p>
                                <details>
                                    <summary>Stack Trace</summary>
                                    <pre>{this.state.errorInfo?.componentStack}</pre>
                                </details>
                            </div>
                        )}

                        <div className="error-actions">
                            <button onClick={this.handleReload} className="btn btn-primary">
                                <RefreshCw size={18} />
                                <span>Reload Page</span>
                            </button>
                            <button onClick={this.handleGoHome} className="btn btn-secondary">
                                <Home size={18} />
                                <span>Go Home</span>
                            </button>
                        </div>
                    </div>

                    <style>{`
                        .error-boundary {
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: var(--color-bg);
                            color: var(--color-text);
                            padding: 2rem;
                            text-align: center;
                        }
                        
                        .error-boundary__content {
                            max-width: 600px;
                            width: 100%;
                            background: var(--color-surface);
                            padding: 3rem;
                            border-radius: var(--radius-lg);
                            box-shadow: var(--shadow-lg);
                        }

                        .error-icon {
                            color: var(--color-error);
                            margin-bottom: 1.5rem;
                            display: inline-flex;
                            padding: 1rem;
                            background: rgba(239, 68, 68, 0.1);
                            border-radius: 50%;
                        }

                        .error-boundary h1 {
                            margin-bottom: 1rem;
                            font-size: 2rem;
                        }

                        .error-message {
                            color: var(--color-text-muted);
                            margin-bottom: 2rem;
                            font-size: 1.1rem;
                            line-height: 1.6;
                        }

                        .error-details {
                            text-align: left;
                            background: rgba(0,0,0,0.05);
                            padding: 1rem;
                            border-radius: var(--radius-md);
                            margin-bottom: 2rem;
                            font-family: monospace;
                            font-size: 0.9rem;
                            overflow-x: auto;
                        }

                        .error-code {
                            color: var(--color-error);
                            font-weight: bold;
                            margin-bottom: 0.5rem;
                        }

                        .error-actions {
                            display: flex;
                            gap: 1rem;
                            justify-content: center;
                            flex-wrap: wrap;
                        }

                        .error-actions .btn {
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                        }
                    `}</style>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
