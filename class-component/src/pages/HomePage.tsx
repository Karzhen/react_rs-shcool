import React, { useState } from 'react';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import SearchInput from '../components/SearchInput/SearchInput';
import SearchResults from '../components/SearchResults/SearchResults';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import './HomePage.css';
import Details from "./Details.tsx"; // добавьте стили для раскладки

const HomePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || '1';

    const [searchTerm, setSearchTerm] = useState(search);
    const [currentPage, setCurrentPage] = useState(Number(page));

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
        navigate(`/?search=${term.toLowerCase()}&page=1`);
    };

    const handleNextPage = (callback: () => void) => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        callback();
        navigate(`/?search=${searchTerm.toLowerCase()}&page=${nextPage}`);
    };

    const handlePrevPage = (callback: () => void) => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        callback();
        navigate(`/?search=${searchTerm.toLowerCase()}&page=${prevPage}`);
    };

    const handleCloseDetails = () => {
        navigate(`/?search=${searchTerm.toLowerCase()}&page=${currentPage}`);
    };

    return (
        <div className="home-page">
            <ErrorBoundary>
                <SearchInput onSearch={handleSearch} />
                <div className="content">
                    <SearchResults
                        searchTerm={searchTerm}
                        handleNextPage={handleNextPage}
                        handlePrevPage={handlePrevPage}
                    />
                    {/*<Outlet />*/}
                    {id && <Details onClose={handleCloseDetails} />}
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default HomePage;
