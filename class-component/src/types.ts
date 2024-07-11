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
};

export type AppState = {
    searchTerm: string;
    searchResults: Character[];
    hasError: boolean;
    error: Error | null;
    isLoading: boolean;
    next: string | null;
    prev: string | null;
};