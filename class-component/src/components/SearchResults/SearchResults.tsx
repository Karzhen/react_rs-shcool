import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CharacterCard from '../Character/CharacterCard';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import ErrorMessage from '../../ErrorMessage';
import styles from './SearchResults.module.css';
import { SearchResultsProps } from '../../types';
import { useFetchResultsQuery } from '../../redux';
import extractIdFromUrl from '../../utils/extractIdFromUrl.ts';

const SearchResults: React.FC<SearchResultsProps> = ({
    searchTerm,
    currentPage,
    handleNextPage,
    handlePrevPage,
}) => {
    const [page, setPage] = useState(currentPage);

    const {
        data = { results: [], next: null, previous: null },
        isLoading,
        error,
    } = useFetchResultsQuery({ searchTerm, pageNumber: page });
    console.log(data);
    const next = data.next;
    const prev = data.previous;
    const searchResults = data.results;

    const navigate = useNavigate();
    const location = useLocation();

    const handleCharacterClick = (id: string) => {
        const queryParams = new URLSearchParams(location.search);
        const urlQuery = queryParams.toString();
        console.log(urlQuery);
        navigate(`/details/${id}/?${urlQuery}`);
    };

    const loadNextPage = () => {
        if (next) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const loadPrevPage = () => {
        if (prev) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

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
