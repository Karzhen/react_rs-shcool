import React, { CSSProperties, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import SearchInput from '../../components/SearchInput/SearchInput.tsx';
import SearchResults from '../../components/SearchResults/SearchResults.tsx';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary.tsx';
import './HomePage.css';
import Details from '../Details/Details.tsx';
import useLocalStorage from '../../hooks/useLocalStorage.ts';
import { useTheme } from '../../ThemeContext.tsx';

const HomePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page'), 10) || '1';

    const [searchTerm, setSearchTerm] = useLocalStorage(
        'lastSearchTerm',
        search,
    );
    const [currentPage, setCurrentPage] = useState(Number(page));
    const { themeColors } = useTheme();

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
        navigate(`/?search=${term.toLowerCase()}&page=${currentPage}`);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => {
            const nextPage = prevPage + 1;
            navigate(`/?search=${searchTerm.toLowerCase()}&page=${nextPage}`);
            return nextPage;
        });
    };

    const handlePrevPage = () => {
        setCurrentPage((nextPage) => {
            const prevPage = nextPage - 1;
            navigate(`/?search=${searchTerm.toLowerCase()}&page=${prevPage}`);
            return prevPage;
        });
    };

    // const handleCloseDetails = () => {
    //     navigate(`/?search=${searchTerm.toLowerCase()}&page=${currentPage}`);
    // };

    useEffect(() => {
        console.log(searchTerm);
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

    return (
        <div
            className="home-page"
            style={{ ...(themeColors as CSSProperties) }}
        >
            {/*<button className="toggle-theme-button" onClick={setTheme}>*/}
            {/*    Switch to {theme === 'light' ? 'dark' : 'light'} mode*/}
            {/*</button>*/}
            <SearchInput onSearch={handleSearch} />
            <div className="content">
                <SearchResults
                    searchTerm={searchTerm}
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                />
                {/*{id && <Details onClose={handleCloseDetails} />}*/}
                {id && <Details />}
            </div>
        </div>
    );
};

export default HomePage;
