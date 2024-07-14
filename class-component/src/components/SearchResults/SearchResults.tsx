import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../Character/CharacterCard';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import ErrorMessage from '../../ErrorMessage';
import styles from './SearchResults.module.css';
import { SearchResultsProps } from '../../types';
import { useFetchSearchResults } from '../../hooks/useFetchSearchResults';

const SearchResults: React.FC<SearchResultsProps> = ({
    searchTerm,
    handleNextPage,
    handlePrevPage,
}) => {
    const { searchResults, isLoading, error, next, prev, fetchResults } =
        useFetchSearchResults(searchTerm);

    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm) {
            fetchResults(searchTerm);
        }
    }, [searchTerm]);

    const handleCharacterClick = (id: number) => {
        navigate(`/details/${id}`);
    };

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
                            <CharacterCard
                                key={index}
                                character={result}
                                onClick={() => handleCharacterClick(index)}
                            />
                        ))}
                    </div>
                    {(next !== null || prev !== null) && (
                        <Pagination
                            next={next}
                            prev={prev}
                            handleNextPage={() => handleNextPage(fetchResults)}
                            handlePrevPage={() => handlePrevPage(fetchResults)}
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
