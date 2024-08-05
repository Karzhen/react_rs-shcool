import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CharacterCard from '../Character/CharacterCard';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './SearchResults.module.css';
import { SearchResultsProps } from '@/types';
import { useFetchResultsQuery } from '@/redux/starAPI';
import extractIdFromUrl from '@/utils/extractIdFromUrl';

const SearchResults: React.FC<SearchResultsProps> = ({
    searchTerm,
    currentPage,
    handleNextPage,
    handlePrevPage,
}) => {
    const [page, setPage] = useState(currentPage);
    const router = useRouter();

    const {
        data = { results: [], next: null, previous: null },
        isLoading,
        error,
    } = useFetchResultsQuery({ searchTerm, pageNumber: page });

    const next = data.next;
    const prev = data.previous;
    const searchResults = data.results;

    const handleCharacterClick = (id: string) => {
        const urlQuery = router.asPath.split('?')[1] || '';
        router.push(`/details/${id}?${urlQuery}`);
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
                                    handleCharacterClick(extractIdFromUrl(result.url))
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