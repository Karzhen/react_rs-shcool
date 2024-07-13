import React, { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        console.log(error.message);
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('ErrorBoundary caught an error', error, errorInfo);
        this.setState({ hasError: true });
    }

    triggerError = (): void => {
        console.error("This test error is Empty, but it's already here");
        this.setState({ hasError: true });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.container}>
                    <h1>Something went wrong.</h1>
                    <p className={styles.errorMessage}>
                        Please try again later.
                    </p>
                </div>
            );
        }

        return (
            <div>
                <button
                    onClick={this.triggerError}
                    className={styles.triggerButton}
                >
                    Trigger Error
                </button>
                {this.props.children}
            </div>
        );
    }
}

export default ErrorBoundary;
