import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from './useLocalStorage.ts';

export const useSearch = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    const page = parseInt(<string>searchParams.get('page'), 10) || 1;

    const [searchTerm, setSearchTerm] = useLocalStorage(
        'lastSearchTerm',
        search,
    );
    const [currentPage, setCurrentPage] = useState(Number(page));

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
        navigate(`/?search=${term.toLowerCase()}&page=1`);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => {
            const nextPage = prevPage + 1;
            navigate(`/?search=${searchTerm.toLowerCase()}&page=${nextPage}`);
            return nextPage;
        });
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => {
            const prevPageNumber = prevPage - 1;
            navigate(
                `/?search=${searchTerm.toLowerCase()}&page=${prevPageNumber}`,
            );
            return prevPageNumber;
        });
    };

    useEffect(() => {
        if (!location.search) {
            navigate(
                `/?search=${searchTerm.toLowerCase()}&page=${currentPage}`,
            );
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
