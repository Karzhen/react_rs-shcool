import React, { CSSProperties, ReactNode } from 'react';
import SearchInput from '@/components/SearchInput/SearchInput';
import SearchResults from '@/components/SearchResults/SearchResults';
import { useTheme } from '@/ThemeContext';
import Dropdown from '@/components/DropDown/DropDown';
import { useSearch } from '@/hooks/useSearch';
import styles from '@/components/HomePage/HomePage.module.css';
import Layout from '@/components/Layout/Layout';

interface LayoutHomeProps {
    children: React.ReactNode;
}

const HomePage: React.FC = ({ children }: LayoutHomeProps) => {
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
            className={styles['home-page']}
            style={{ ...(themeColors as CSSProperties) }}
        >
            <SearchInput onSearch={handleSearch} />
            <Dropdown />
            <div className={styles['content']}>
                <SearchResults
                    searchTerm={searchTerm}
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                />
                {children}
            </div>
        </div>
    );
};

export default HomePage;

// export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
//
// });