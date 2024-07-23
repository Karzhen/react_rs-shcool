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
    currentPage,
    handleNextPage,
    handlePrevPage,
}) => {
    // const location = useLocation();
    const {
        searchResults,
        isLoading,
        error,
        next,
        prev,
        loadNextPage,
        loadPrevPage,
        fetchResults,
    } = useFetchSearchResults(searchTerm, currentPage);
    const navigate = useNavigate();

    useEffect(() => {
        fetchResults(searchTerm, currentPage).catch((error) => {
            console.error('Failed to fetch initial results:', error);
        });
    }, [searchTerm, currentPage]);

    const handleCharacterClick = (id: number) => {
        const queryParams = new URLSearchParams(location.search);
        const urlQuery = queryParams.toString();
        console.log(urlQuery);
        navigate(`/details/${id}/?${urlQuery}`);
    };

    const extractIdFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
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
                        {searchResults.map((result) => (
                            <CharacterCard
                                key={extractIdFromUrl(result.url)}
                                character={result}
                                onClick={() =>
                                    handleCharacterClick(
                                        extractIdFromUrl(result.url),
                                    )
                                }
                            />
                        ))}
                    </div>
                    {(next !== null || prev !== null) && (
                        <Pagination
                            next={next}
                            prev={prev}
                            handleNextPage={() => handleNextPage(loadNextPage)}
                            handlePrevPage={() => handlePrevPage(loadPrevPage)}
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
