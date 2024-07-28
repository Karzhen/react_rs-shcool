import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import Footer from './Footer';
import { useTheme } from '../../ThemeContext.tsx';
import styles from './Footer.module.css';

vi.mock('../../ThemeContext.tsx', () => ({
    useTheme: vi.fn(),
}));

describe('Footer Component', () => {
    test('renders footer with correct links and text', () => {
        const themeColors = { backgroundColor: 'black', color: 'white' };
        useTheme.mockReturnValue({ themeColors });

        render(<Footer />);

        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveClass(styles.footer);

        const githubLink = screen.getByText('My GitHub');
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveClass(styles.link);
        expect(githubLink).toHaveAttribute(
            'href',
            'https://github.com/Karzhen',
        );
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

        const taskDescriptionLink = screen.getByText('Task description');
        expect(taskDescriptionLink).toBeInTheDocument();
        expect(taskDescriptionLink).toHaveClass(styles.link);
        expect(taskDescriptionLink).toHaveAttribute(
            'href',
            'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/redux.md',
        );
        expect(taskDescriptionLink).toHaveAttribute('target', '_blank');
        expect(taskDescriptionLink).toHaveAttribute(
            'rel',
            'noopener noreferrer',
        );

        const textElement = screen.getByText('© 2024');
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveClass(styles.text);
    });
});
