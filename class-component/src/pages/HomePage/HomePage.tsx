import React, { CSSProperties } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import SearchInput from '../../components/SearchInput/SearchInput.tsx';
import SearchResults from '../../components/SearchResults/SearchResults.tsx';
import './HomePage.css';
import { useTheme } from '../../ThemeContext.tsx';
import Dropdown from '../../components/DropDown/DropDown.tsx';
import { useSearch } from '../../hooks/useSearch';

const HomePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { themeColors } = useTheme();

    const {
        searchTerm,
        currentPage,
        handleSearch,
        handleNextPage,
        handlePrevPage,
    } = useSearch();

    return (
        <div
            className="home-page"
            style={{ ...(themeColors as CSSProperties) }}
        >
            <SearchInput onSearch={handleSearch} />
            <Dropdown />
            <div className="content">
                <SearchResults
                    searchTerm={searchTerm}
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                />
                {id && <Outlet />}
            </div>
        </div>
    );
};

export default HomePage;
