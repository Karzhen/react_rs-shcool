import { AppState, Character } from '../../types.ts';
import { fetchFilmTitle, fetchHomeworldName } from './apiUtils.ts';
import React from 'react';

export const fetchSearchResults = async (
    component: React.Component<Record<string, never>, AppState>,
    searchTerm: string,
    url: string | null = null,
) => {
    component.setState({
        searchTerm: searchTerm.trim(),
        searchResults: [],
        hasError: false,
        error: null,
        isLoading: true,
        next: null,
        prev: null,
    });

    try {
        const response = await fetch(
            url || `https://swapi.dev/api/people/?search=${searchTerm}`,
        );
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        const characters = await Promise.all(
            data.results.map(async (character: Character) => {
                const films = await Promise.all(
                    character.films.map((filmUrl: string) =>
                        fetchFilmTitle(filmUrl),
                    ),
                );
                const homeworld = await fetchHomeworldName(character.homeworld);
                return { ...character, films, homeworld };
            }),
        );

        component.setState({
            searchTerm: searchTerm.trim(),
            searchResults: characters,
            hasError: false,
            error: null,
            isLoading: false,
            next: data.next,
            prev: data.previous,
        });

        if (!url) {
            localStorage.setItem('lastSearchTerm', searchTerm.trim());
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            component.setState({
                searchTerm: '',
                searchResults: [],
                hasError: true,
                error,
                isLoading: false,
                next: null,
                prev: null,
            });
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
};

export const fetchLastSearchTerm = async (
    component: React.Component<Record<string, never>, AppState>,
) => {
    const lastSearchTerm = localStorage.getItem('lastSearchTerm') || '';
    await fetchSearchResults(component, lastSearchTerm);
};

export const handleNextPage = async (
    component: React.Component<Record<string, never>, AppState>,
) => {
    const { searchTerm, next } = component.state;
    if (next) {
        await fetchSearchResults(component, searchTerm, next);
    }
};

export const handlePrevPage = async (
    component: React.Component<Record<string, never>, AppState>,
) => {
    const { searchTerm, prev } = component.state;
    if (prev) {
        await fetchSearchResults(component, searchTerm, prev);
    }
};
