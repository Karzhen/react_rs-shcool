import { useEffect, useState } from 'react';
import { Character, Nullable } from '../types.ts';
import { fetchResultsFromApi } from '../utils/api.ts';

export const useFetchSearchResults = (
    initialSearchTerm: string,
    page: number = 1,
) => {
    const [searchTerm] = useState(initialSearchTerm);
    const [searchResults, setSearchResults] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Nullable<Error>>(null);
    const [next, setNext] = useState<Nullable<string>>(null);
    const [prev, setPrev] = useState<Nullable<string>>(null);

    const fetchResults = async (searchTerm: string, pageNumber: string) => {
        setIsLoading(true);
        try {
            const { characters, next, prev } = await fetchResultsFromApi(
                searchTerm,
                pageNumber,
            );
            setSearchResults(characters);
            setNext(next);
            setPrev(prev);
            setError(null);
        } catch (error) {
            setError(error as Error);
            setSearchResults([]);
            setNext(null);
            setPrev(null);
        } finally {
            setIsLoading(false);
        }
    };

    // посмотреть useParams

    useEffect(() => {
        if (initialSearchTerm) {
            console.log('Search term: ', searchTerm);
            const lastSearchTerm = localStorage.getItem('lastSearchTerm') || '';
            console.log('Last search term: ', lastSearchTerm);
            fetchResults(searchTerm, page.toString()).catch((error) => {
                console.error('Failed to fetch initial results:', error);
            });
        }
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
