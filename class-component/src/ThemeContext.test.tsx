import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';
import { THEMES } from './context/contextTypes.ts';

const TestComponent = () => {
    const { theme, themeColors, setTheme } = useTheme();
    return (
        <div>
            <p data-testid="theme">{theme}</p>
            <p data-testid="theme-color">{themeColors['--primary']}</p>
            <button onClick={setTheme} data-testid="toggle-theme-button">
                Toggle Theme
            </button>
        </div>
    );
};

describe('ThemeContext', () => {
    test('provides the correct initial context values', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>,
        );

        expect(screen.getByTestId('theme').textContent).toBe('light');
        expect(screen.getByTestId('theme-color').textContent).toBe(
            THEMES.light['--primary'],
        );
    });

    test('toggles the theme when setTheme is called', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>,
        );

        const toggleButton = screen.getByTestId('toggle-theme-button');

        // Первоначальная тема - светлая
        expect(screen.getByTestId('theme').textContent).toBe('light');
        expect(screen.getByTestId('theme-color').textContent).toBe(
            THEMES.light['--primary'],
        );

        // Переключение темы на темную
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('theme').textContent).toBe('dark');
        expect(screen.getByTestId('theme-color').textContent).toBe(
            THEMES.dark['--primary'],
        );

        // Переключение темы обратно на светлую
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('theme').textContent).toBe('light');
        expect(screen.getByTestId('theme-color').textContent).toBe(
            THEMES.light['--primary'],
        );
    });
});
