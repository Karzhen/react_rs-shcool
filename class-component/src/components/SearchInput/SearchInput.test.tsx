import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import SearchInput from './SearchInput';
import styles from './SearchInput.module.css';
import useLocalStorage from '../../hooks/useLocalStorage.ts';

vi.mock('../../hooks/useLocalStorage.ts');

describe('SearchInput Component', () => {
    test('renders input and button elements', () => {
        useLocalStorage.mockReturnValue(['', vi.fn()]);
        render(<SearchInput onSearch={vi.fn()} />);

        const inputElement = screen.getByPlaceholderText('Enter search term');
        const buttonElement = screen.getByText('Search');

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveClass(styles.input);
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass(styles.button);
    });

    test('initializes input with value from localStorage', () => {
        useLocalStorage.mockReturnValue(['initialValue', vi.fn()]);
        render(<SearchInput onSearch={vi.fn()} />);

        const inputElement = screen.getByPlaceholderText('Enter search term');
        expect(inputElement).toHaveValue('initialValue');
    });

    test('updates input value on change', () => {
        useLocalStorage.mockReturnValue(['', vi.fn()]);
        render(<SearchInput onSearch={vi.fn()} />);

        const inputElement = screen.getByPlaceholderText('Enter search term');
        fireEvent.change(inputElement, { target: { value: 'new value' } });

        expect(inputElement).toHaveValue('new value');
    });

    test('calls onSearch and updates localStorage on search button click', () => {
        const onSearchMock = vi.fn();
        const setStoredSearchTermMock = vi.fn();
        useLocalStorage.mockReturnValue(['', setStoredSearchTermMock]);

        render(<SearchInput onSearch={onSearchMock} />);

        const inputElement = screen.getByPlaceholderText('Enter search term');
        fireEvent.change(inputElement, { target: { value: 'search term' } });

        const buttonElement = screen.getByText('Search');
        fireEvent.click(buttonElement);

        expect(setStoredSearchTermMock).toHaveBeenCalledWith('search term');
        expect(onSearchMock).toHaveBeenCalledWith('search term');
    });

    test('trims input value before calling onSearch', () => {
        const onSearchMock = vi.fn();
        const setStoredSearchTermMock = vi.fn();
        useLocalStorage.mockReturnValue(['', setStoredSearchTermMock]);

        render(<SearchInput onSearch={onSearchMock} />);

        const inputElement = screen.getByPlaceholderText('Enter search term');
        fireEvent.change(inputElement, {
            target: { value: '  search term  ' },
        });

        const buttonElement = screen.getByText('Search');
        fireEvent.click(buttonElement);

        expect(setStoredSearchTermMock).toHaveBeenCalledWith('search term');
        expect(onSearchMock).toHaveBeenCalledWith('search term');
    });
});
