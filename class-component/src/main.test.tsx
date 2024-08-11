import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { ThemeProvider, useTheme } from './ThemeContext.tsx';
import App from './components/App/App';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { describe, test, vi } from 'vitest';

vi.mock('./ThemeContext', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useTheme: vi.fn(),
    };
});

describe('App Integration', () => {
    test('renders Header and Footer correctly within the App', () => {
        const themeColors = { backgroundColor: 'blue', color: 'white' };
        const setTheme = vi.fn();
        (useTheme as vi.Mock).mockReturnValue({
            theme: 'light',
            themeColors,
            setTheme,
        });

        render(
            <Provider store={store}>
                <ThemeProvider>
                    <ErrorBoundary>
                        <Header />
                        <App />
                        <Footer />
                    </ErrorBoundary>
                </ThemeProvider>
            </Provider>,
        );
    });
});
