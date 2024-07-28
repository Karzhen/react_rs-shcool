import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import styles from './ErrorBoundary.module.css';

describe('ErrorBoundary Component', () => {
    test('renders child component without error', () => {
        render(
            <ErrorBoundary>
                <div data-testid="child">Child Component</div>
            </ErrorBoundary>
        );

        const childElement = screen.getByTestId('child');
        expect(childElement).toBeInTheDocument();
    });

    test('displays error message when error is triggered', () => {
        render(
            <ErrorBoundary>
                <div data-testid="child">Child Component</div>
            </ErrorBoundary>
        );

        const triggerButton = screen.getByText('Trigger Error');
        fireEvent.click(triggerButton);

        const errorMessage = screen.getByText('Something went wrong.');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage.parentElement).toHaveClass(styles.container);

        const errorDescription = screen.getByText('Please try again later.');
        expect(errorDescription).toBeInTheDocument();
        expect(errorDescription).toHaveClass(styles.errorMessage);
    });
});
