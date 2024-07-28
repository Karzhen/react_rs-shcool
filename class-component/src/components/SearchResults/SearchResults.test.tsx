import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import SearchResults from './SearchResults';
import { useFetchResultsQuery } from '../../redux';

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
    useLocation: vi.fn(() => ({ search: '' })),
}));

vi.mock('../../redux', () => ({
    useFetchResultsQuery: vi.fn(),
}));

vi.mock('../Character/CharacterCard', () => ({
    __esModule: true,
    default: (props) => (
        <div onClick={() => props.onClick()}>{props.character.name}</div>
    ),
}));

vi.mock('../Pagination/Pagination', () => ({
    __esModule: true,
    default: (props) => (
        <div>
            {props.prev && (
                <button onClick={props.handlePrevPage}>Prev Page</button>
            )}
            {props.next && (
                <button onClick={props.handleNextPage}>Next Page</button>
            )}
        </div>
    ),
}));

vi.mock('../Loader/Loader', () => ({
    __esModule: true,
    default: () => (
        <div data-testid="loader">
            <div data-testid="spinner"></div>
        </div>
    ),
}));

vi.mock('../../ErrorMessage', () => ({
    __esModule: true,
    default: (props) => <div>{props.error.message}</div>,
}));

describe('SearchResults Component', () => {
    test('renders loader while loading', () => {
        useFetchResultsQuery.mockReturnValue({
            data: { results: [], next: null, previous: null },
            isLoading: true,
            error: null,
        });

        render(
            <SearchResults
                searchTerm="test"
                currentPage={1}
                handleNextPage={vi.fn()}
                handlePrevPage={vi.fn()}
            />,
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    test('renders error message on error', () => {
        useFetchResultsQuery.mockReturnValue({
            data: { results: [], next: null, previous: null },
            isLoading: false,
            error: { message: 'Error occurred' },
        });

        render(
            <SearchResults
                searchTerm="test"
                currentPage={1}
                handleNextPage={vi.fn()}
                handlePrevPage={vi.fn()}
            />,
        );

        expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });

    test('renders search results correctly', () => {
        const results = [
            { url: 'http://swapi.dev/api/people/1/', name: 'Luke Skywalker' },
            { url: 'http://swapi.dev/api/people/2/', name: 'Darth Vader' },
        ];
        useFetchResultsQuery.mockReturnValue({
            data: { results, next: null, previous: null },
            isLoading: false,
            error: null,
        });

        render(
            <SearchResults
                searchTerm="test"
                currentPage={1}
                handleNextPage={vi.fn()}
                handlePrevPage={vi.fn()}
            />,
        );

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });
});
