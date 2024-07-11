import { Component } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import ErrorBoundary from './ErrorBoundary';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { AppState } from './types';
import {
    fetchSearchResults,
    fetchLastSearchTerm,
    handleNextPage,
    handlePrevPage,
} from './search';
import Pagination from "./Pagination.tsx";

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
                    <SearchInput
                        onSearch={(term) => fetchSearchResults(this, term)}
                    />
                    {isLoading && <Loader />}
                    <SearchResults results={searchResults} />
                    <ErrorMessage error={error} />
                    <Pagination
                        next={next}
                        prev={prev}
                        handleNextPage={() => handleNextPage(this)}
                        handlePrevPage={() => handlePrevPage(this)}
                    />
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
