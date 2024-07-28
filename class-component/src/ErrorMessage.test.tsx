import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import ErrorMessage from './ErrorMessage';
import { ErrorMessageProps } from './types';

describe('ErrorMessage Component', () => {
    test('returns null if no error is provided', () => {
        render(<ErrorMessage error={null} />);

        const errorElement = screen.queryByText(/Error:/);
        expect(errorElement).not.toBeInTheDocument();
    });

    test('renders the error message if an error is provided', () => {
        const error = { message: 'Test error message' };

        render(<ErrorMessage error={error} />);

        const errorElement = screen.getByText(/Error: Test error message/);
        expect(errorElement).toBeInTheDocument();
    });
});
