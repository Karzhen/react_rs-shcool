import { useEffect, useState } from 'react';
import { Character, Nullable } from '../types.ts';

export const useFetchSearchResults = (initialSearchTerm: string) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [searchResults, setSearchResults] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Nullable<Error>>(null);
    const [next, setNext] = useState<Nullable<string>>(null);
    const [prev, setPrev] = useState<Nullable<string>>(null);

    const fetchFilmTitles = async (filmUrls: string[]): Promise<string[]> => {
        const fetchedTitles = await Promise.all(
            filmUrls.map(async (url) => {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch film data from ${url}`);
                }
                const data = await response.json();
                return data.title;
            }),
        );
        console.log(fetchedTitles);
        return fetchedTitles;
    };

    const fetchHomeworldName = async (url: string): Promise<string> => {
        const response = await fetch(url);
        const data = await response.json();
        return data.name;
    };

    const fetchResults = async (term: string, url: Nullable<string> = null) => {
        setIsLoading(true);
        // term !== '' ? setSearchTerm(term.trim()) : setSearchTerm('');
        setSearchTerm(term.trim());
        try {
            const response = await fetch(
                url || `https://swapi.dev/api/people/?search=${term}`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            const characters = await Promise.all(
                data.results.map(async (character: Character) => {
                    // console.log(character)
                    const films = await fetchFilmTitles(character.films);
                    const homeworld = await fetchHomeworldName(
                        character.homeworld,
                    );
                    return { ...character, films, homeworld };
                }),
            );

            setSearchResults(characters);
            setNext(data.next);
            setPrev(data.previous);
            // localStorage.setItem('lastSearchTerm', term.trim());
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const lastSearchTerm = localStorage.getItem('lastSearchTerm') || '';
        fetchResults(lastSearchTerm);
    }, []);

    const loadNextPage = async () => {
        if (next) {
            await fetchResults(searchTerm, next);
        }
    };

    const loadPrevPage = async () => {
        if (prev) {
            await fetchResults(searchTerm, prev);
        }
    };

    return {
        searchTerm,
        searchResults,
        isLoading,
        error,
        next,
        prev,
        fetchResults,
        loadNextPage,
        loadPrevPage,
    };
};
