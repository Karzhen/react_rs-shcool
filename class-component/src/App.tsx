import React, { Component } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import ErrorBoundary from './ErrorBoundary';

type AppState = {
    searchTerm: string;
    searchResults: Character[];
    error: Error | null;
    isLoading: boolean;
    next: string | null;
    prev: string | null;
};

type Character = {
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

class App extends Component<Record<string, never>, AppState> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: [],
            error: null,
            isLoading: false,
            next: null,
            prev: null,
        };
    }

    static fetchFilmTitle = async (url: string): Promise<string> => {
        const response = await fetch(url);
        const data = await response.json();
        return data.title;
    };

    static fetchHomeworldName = async (url: string): Promise<string> => {
        const response = await fetch(url);
        const data = await response.json();
        return data.name;
    };

    fetchSearchResults = async (
        searchTerm: string,
        url: string | null = null,
    ) => {
        this.setState({ isLoading: true });
        try {
            const response = await fetch(
                url || `https://swapi.dev/api/people/?search=${searchTerm}`,
            );
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);

            const resultsArray = [];
            data.results.forEach((result) => {
                resultsArray.push(result.name);
            });

            const characters = await Promise.all(
                data.results.map(async (character: Character) => {
                    const films = await Promise.all(
                        character.films.map((filmUrl: string) =>
                            App.fetchFilmTitle(filmUrl),
                        ),
                    );
                    const homeworld = await App.fetchHomeworldName(
                        character.homeworld,
                    );
                    return { ...character, films, homeworld };
                }),
            );

            this.setState({
                searchTerm: searchTerm.trim(),
                searchResults: characters,
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
                this.setState({
                    searchTerm: '',
                    searchResults: [],
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

    handleSearch = async (searchTerm: string) => {
        await this.fetchSearchResults(searchTerm);
    };

    fetchLastSearchTerm = async () => {
        const lastSearchTerm = localStorage.getItem('lastSearchTerm') || '';
        await this.fetchSearchResults(lastSearchTerm);
    };

    handleNextPage = async () => {
        const { searchTerm, next } = this.state;
        if (next) {
            await this.fetchSearchResults(searchTerm, next);
        }
    };

    handlePrevPage = async () => {
        const { searchTerm, prev } = this.state;
        if (prev) {
            await this.fetchSearchResults(searchTerm, prev);
        }
    };

    async componentDidMount() {
        await this.fetchLastSearchTerm();
    }

    render() {
        const { searchResults, error, isLoading, next, prev } = this.state;

        return (
            <div className="App">
                <ErrorBoundary>
                    <SearchInput onSearch={this.handleSearch} />
                    {isLoading && <p>Loading...</p>}
                    <SearchResults results={searchResults} />
                    {error && <p>Error: {error.message}</p>}
                    <div className="pagination">
                        {prev && (
                            <button onClick={this.handlePrevPage}>
                                Prev Page
                            </button>
                        )}
                        {next && (
                            <button onClick={this.handleNextPage}>
                                Next Page
                            </button>
                        )}
                    </div>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
