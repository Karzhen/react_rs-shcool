import { Component } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import ErrorBoundary from './ErrorBoundary';
import { Character, AppState } from './types';
import {
    fetchSearchResults,
    fetchLastSearchTerm,
    handleNextPage,
    handlePrevPage,
} from './search';

class App extends Component<Record<string, never>, AppState> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResults: [],
            hasError: false,
            error: null,
            isLoading: false,
            next: null,
            prev: null,
        };
    }

    componentDidMount() {
        fetchLastSearchTerm(this);
    }

    render() {
        const { searchResults, error, isLoading, next, prev } = this.state;

        return (
            <div className="App">
                <ErrorBoundary>
                    <SearchInput onSearch={(term) => fetchSearchResults(this, term)} />
                    {isLoading && <h3>Loading...</h3>}
                    <SearchResults results={searchResults} />
                    {error && <p>Error: {error.message}</p>}
                    <div className="pagination">
                        {prev && <button onClick={() => handlePrevPage(this)}>Prev Page</button>}
                        {next && <button onClick={() => handleNextPage(this)}>Next Page</button>}
                    </div>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
