import { ReactNode } from 'react';

export type Character = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    url: string;
    starships: string[];
    vehicles: string[];
};

export type CharacterCardProps = {
    character: Character;
    onClick: () => void;
};

export type CharacterDetailProps = {
    label: string;
    value: string;
};

export type SearchInputProps = {
    onSearch: (input: string) => void;
};

export type SearchResultsProps = {
    searchTerm: string;
    currentPage: number;
    handleNextPage: (
        fetchResults: (term: string, url?: Nullable<string>) => Promise<void>,
    ) => void;
    handlePrevPage: (
        fetchResults: (term: string, url?: Nullable<string>) => Promise<void>,
    ) => void;
};

export type Nullable<T> = T | null;

export type ErrorMessageProps = {
    error: Nullable<Error>;
};

export type AppState = {
    searchTerm: string;
    searchResults: Character[];
    hasError: boolean;
    error: Nullable<Error>;
    isLoading: boolean;
    next: Nullable<string>;
    prev: Nullable<string>;
};

export type PaginationProps = {
    next: Nullable<string>;
    prev: Nullable<string>;
    handleNextPage: () => void;
    handlePrevPage: () => void;
};

export type ErrorBoundaryProps = {
    children: ReactNode;
};

export type ErrorBoundaryState = {
    hasError: boolean;
};

export type ApiResponse = {
    results: Character[];
    next: string | null;
    previous: string | null;
};
