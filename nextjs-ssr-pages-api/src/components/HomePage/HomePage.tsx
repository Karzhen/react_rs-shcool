import React, { CSSProperties } from 'react';
import { useRouter } from 'next/router';
import SearchInput from '../SearchInput/SearchInput';
import SearchResults from '../SearchResults/SearchResults';
import './HomePage.css';
import { useTheme } from '../../ThemeContext';
import Dropdown from '../DropDown/DropDown';
import { useSearch } from '../../hooks/useSearch';

const HomePage: React.FC = () => {
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
            </div>
        </div>
    );
};

export default HomePage;