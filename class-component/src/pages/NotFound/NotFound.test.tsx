import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import NotFound from './NotFound';

describe('NotFound Component', () => {
    test('renders 404 message', () => {
        render(<NotFound />);
        expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
        expect(screen.getByText('Sorry, the page you are looking for does not exist.')).toBeInTheDocument();
    });
});
