import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import Pagination from './Pagination';
import styles from './Pagination.module.css';

describe('Pagination Component', () => {
    test('renders Prev and Next buttons based on props', () => {
        const handleNextPage = vi.fn();
        const handlePrevPage = vi.fn();

        // Тест с кнопками "Prev Page" и "Next Page"
        const { rerender } = render(
            <Pagination
                next={true}
                prev={true}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
            />,
        );

        let prevButton = screen.getByText('Prev Page');
        let nextButton = screen.getByText('Next Page');

        expect(prevButton).toBeInTheDocument();
        expect(prevButton).toHaveClass(styles['pagination-button']);
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toHaveClass(styles['pagination-button']);

        // Тест только с кнопкой и "Next Page"
        rerender(
            <Pagination
                next={true}
                prev={false}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
            />,
        );

        prevButton = screen.queryByText('Prev Page');
        nextButton = screen.getByText('Next Page');

        expect(prevButton).toBeNull();
        expect(nextButton).toBeInTheDocument();
        expect(nextButton).toHaveClass(styles['pagination-button']);

        // Тест только с кнопкой "Prev Page"
        rerender(
            <Pagination
                next={false}
                prev={true}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
            />,
        );

        prevButton = screen.getByText('Prev Page');
        nextButton = screen.queryByText('Next Page');

        expect(prevButton).toBeInTheDocument();
        expect(prevButton).toHaveClass(styles['pagination-button']);
        expect(nextButton).toBeNull();
    });

    test('calls handleNextPage and handlePrevPage on button clicks', () => {
        const handleNextPage = vi.fn();
        const handlePrevPage = vi.fn();

        render(
            <Pagination
                next={true}
                prev={true}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
            />,
        );

        const prevButton = screen.getByText('Prev Page');
        const nextButton = screen.getByText('Next Page');

        fireEvent.click(prevButton);
        fireEvent.click(nextButton);

        expect(handlePrevPage).toHaveBeenCalledTimes(1);
        expect(handleNextPage).toHaveBeenCalledTimes(1);
    });
});
