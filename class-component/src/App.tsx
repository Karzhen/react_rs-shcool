import React, { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput/SearchInput.tsx';
import SearchResults from './components/SearchResults/SearchResults.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import './App.css';

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const lastSearchTerm = localStorage.getItem('lastSearchTerm') || '';
        if (lastSearchTerm) {
            setSearchTerm(lastSearchTerm);
        }
    }, []);

    return (
        <div className="App">
            <ErrorBoundary>
                <SearchInput onSearch={setSearchTerm} />
                <SearchResults searchTerm={searchTerm} />
            </ErrorBoundary>
        </div>
    );
};

export default App;
