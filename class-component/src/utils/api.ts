import { Character } from '../types';

export const fetchResultsFromApi = async (searchTerm: string, pageNumber: string) => {
    const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}&page=${pageNumber}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const characters = await Promise.all(
        data.results.map(async (character: Character) => {
            return { ...character };
        }),
    );

    return {
        characters,
        next: data.next,
        prev: data.previous,
    };
};
