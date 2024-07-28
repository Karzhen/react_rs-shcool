import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import Header from './Header';
import { useTheme } from '../../ThemeContext.tsx';
import styles from '../Header/Header.module.css';

vi.mock('../../ThemeContext.tsx', () => ({
    useTheme: vi.fn(),
}));

describe('Header Component', () => {
    test('renders header with correct styles and button', () => {
        const themeColors = { backgroundColor: 'blue', color: 'white' };
        const setTheme = vi.fn();
        useTheme.mockReturnValue({ theme: 'light', themeColors, setTheme });

        render(<Header />);

        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toHaveClass(styles.header);

        const buttonElement = screen.getByText('Switch to dark mode');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('toggle-theme-button');
    });

    test('calls setTheme when button is clicked', () => {
        const themeColors = { backgroundColor: 'blue', color: 'white' };
        const setTheme = vi.fn();
        useTheme.mockReturnValue({ theme: 'light', themeColors, setTheme });

        render(<Header />);

        const buttonElement = screen.getByText('Switch to dark mode');
        fireEvent.click(buttonElement);

        expect(setTheme).toHaveBeenCalledTimes(1);
    });

    test('renders correct button text based on theme', () => {
        let theme = 'light';
        const themeColors = { backgroundColor: 'blue', color: 'white' };
        const setTheme = vi.fn(() => {
            theme = theme === 'light' ? 'dark' : 'light';
        });
        useTheme.mockReturnValue({ theme, themeColors, setTheme });

        const { rerender } = render(<Header />);
        const buttonElement = screen.getByText('Switch to dark mode');
        expect(buttonElement).toBeInTheDocument();

        // Simulate theme switch
        fireEvent.click(buttonElement);
        rerender(<Header />);
    });
});
