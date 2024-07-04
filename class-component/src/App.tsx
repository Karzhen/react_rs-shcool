import React, { Component } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import ErrorBoundary from './ErrorBoundary';

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

type AppState = {
    searchTerm: string;
    searchResults: Character[];
    error: Error | null;
};

class App extends Component<{}, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: [],
            error: null
        };
    }

    fetchFilmTitle = async (url: string): Promise<string> => {
        const response = await fetch(url);
        const data = await response.json();
        return data.title;
    };

    fetchHomeworldName = async (url: string): Promise<string> => {
        const response = await fetch(url);
        const data = await response.json();
        return data.name;
    };

    fetchSearchResults = async (searchTerm: string) => {
        try {
            const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            const characters = await Promise.all(
                data.results.map(async (character: any) => {
                    const films = await Promise.all(character.films.map(this.fetchFilmTitle));
                    const homeworld = await this.fetchHomeworldName(character.homeworld);
                    return { ...character, films, homeworld };
                })
            );

            this.setState({
                searchTerm: searchTerm.trim(),
                searchResults: characters,
                error: null
            });
            localStorage.setItem('lastSearchTerm', searchTerm.trim());
        } catch (error: any) {
            this.setState({
                searchTerm: '',
                searchResults: [],
                error
            });
        }
    };


    handleSearch = async (searchTerm: string) => {
        await this.fetchSearchResults(searchTerm);
    };

    fetchLastSearchTerm = async () => {
        const lastSearchTerm = localStorage.getItem('lastSearchTerm') || '';
        await this.fetchSearchResults(lastSearchTerm);
    };

    async componentDidMount() {
        await this.fetchLastSearchTerm();
    }

    render() {
        const { searchResults, error } = this.state;

        return (
            <div className="App">
                <ErrorBoundary>
                    <SearchInput onSearch={this.handleSearch} />
                    <SearchResults results={searchResults} />
                    {error && <p>Error: {error.message}</p>}
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
