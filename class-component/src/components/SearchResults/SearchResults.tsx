import React, { useState, useEffect } from 'react';
import CharacterCard from '../Character/CharacterCard.tsx';
import Pagination from '../Pagination/Pagination.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../../ErrorMessage.tsx';
import styles from './SearchResults.module.css';
import { SearchResultsProps } from '../../types.ts';
import { useFetchSearchResults } from '../../hooks/useFetchSearchResults.ts';

interface SearchResultsProps {
    searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
    const {
        searchResults,
        isLoading,
        error,
        next,
        prev,
        fetchResults,
        loadNextPage,
        loadPrevPage,
    } = useFetchSearchResults(searchTerm);

    useEffect(() => {
        if (searchTerm) {
            fetchResults(searchTerm);
        }
    }, [searchTerm]);

    return (
        <div className={styles.container}>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage error={error} />
            ) : searchResults.length > 0 ? (
                <>
                    <div className={styles.grid}>
                        {searchResults.map((result, index) => (
                            <CharacterCard key={index} character={result} />
                        ))}
                    </div>
                    {(next !== null || prev !== null) && (
                        <Pagination
                            next={next}
                            prev={prev}
                            handleNextPage={loadNextPage}
                            handlePrevPage={loadPrevPage}
                        />
                    )}
                </>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default SearchResults;
