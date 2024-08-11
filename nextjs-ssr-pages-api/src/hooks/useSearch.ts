import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from './useLocalStorage';

export const useSearch = () => {
    const router = useRouter();
    const { query, push } = router;

    const search = (query.search as string) || '';
    const page = parseInt(query.page as string, 10) || 1;

    const [searchTerm, setSearchTerm] = useLocalStorage(
        'lastSearchTerm',
        search,
    );
    const [currentPage, setCurrentPage] = useState(page);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
        push(`/?search=${term.toLowerCase()}&page=1`);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => {
            const nextPage = prevPage + 1;
            push(`/?search=${searchTerm.toLowerCase()}&page=${nextPage}`);
            return nextPage;
        });
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => {
            const prevPageNumber = prevPage - 1;
            push(`/?search=${searchTerm.toLowerCase()}&page=${prevPageNumber}`);
            return prevPageNumber;
        });
    };

    useEffect(() => {
        if (!query.search && !query.page) {
            push(`/?search=${searchTerm.toLowerCase()}&page=${currentPage}`);
        }
    }, []);

    useEffect(() => {
        if (search !== searchTerm) {
            setSearchTerm(search);
        }
    }, [search, searchTerm, setSearchTerm]);

    return {
        searchTerm,
        currentPage,
        handleSearch,
        handleNextPage,
        handlePrevPage,
    };
};
