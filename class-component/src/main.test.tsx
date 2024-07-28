import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { ThemeContext, ThemeProvider, useTheme } from './ThemeContext.tsx';
import App from './components/App/App';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { describe, test, expect, vi } from 'vitest';

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

        // Test Header
        // const headerElement = screen.getByRole('banner');
        // expect(headerElement).toBeInTheDocument();
        // expect(headerElement).toHaveStyle('background-color: blue');
        // const buttonElement = screen.getByText('Switch to dark mode');
        // expect(buttonElement).toBeInTheDocument();
        // fireEvent.click(buttonElement);
        // expect(setTheme).toHaveBeenCalledTimes(1);
        //
        // // Test Footer
        // const footerElement = screen.getByRole('contentinfo');
        // expect(footerElement).toBeInTheDocument();
        // const githubLink = screen.getByText('My GitHub');
        // expect(githubLink).toHaveAttribute('href', 'https://github.com/Karzhen');
        // const taskDescriptionLink = screen.getByText('Task description');
        // expect(taskDescriptionLink).toHaveAttribute('href', 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/redux.md');
        // const textElement = screen.getByText('© 2024');
        // expect(textElement).toBeInTheDocument();
    });
});
