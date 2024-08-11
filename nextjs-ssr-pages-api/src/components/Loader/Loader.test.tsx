import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import Loader from './Loader';
import styles from './Loader.module.css';

describe('Loader Component', () => {
    test('renders loader with correct classes and structure', () => {
        render(<Loader />);

        const loaderElement = screen.getByTestId('loader');
        expect(loaderElement).toBeInTheDocument();
        expect(loaderElement).toHaveClass(styles.loader);

        const spinnerElement = screen.getByTestId('spinner');
        expect(spinnerElement).toBeInTheDocument();
        expect(spinnerElement).toHaveClass(styles.spinner);
    });
});
