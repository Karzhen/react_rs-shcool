import React, { CSSProperties, ReactNode } from 'react';
import SearchInput from '@/components/SearchInput/SearchInput';
import SearchResults from '@/components/SearchResults/SearchResults';
import { useTheme } from '@/ThemeContext';
import Dropdown from '@/components/DropDown/DropDown';
import { useSearch } from '@/hooks/useSearch';
import styles from '@/components/HomePage/HomePage.module.css';
import {wrapper} from "@/redux/store";
import {fetchResults, StarAPI, useFetchResultsQuery} from '@/redux/starAPI';
import Loader from "@/components/Loader/Loader";

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

    const { data, isFetching } = useFetchResultsQuery({ searchTerm, pageNumber: currentPage });

    if (isFetching) {
        return <Loader />; // Можно заменить на ваш компонент загрузки
    }

    if (!data) {
        return <div>No data available.</div>;
    }

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
                    data={data}
                />
                {children}
            </div>
        </div>
    );
};

export default HomePage;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { search, page } = context.query;
    console.log(search, page, '---------------------------------------------------------------------------------------------------------------------------------------------------------')
    console.log({searchTerm: search || '', pageNumber: page || 1}, 'ОБЪЕКТ')

    const result = await store.dispatch(
        fetchResults.initiate({ searchTerm: search || '', pageNumber: Number(page) })
    );

    console.log('Server Side Fetch Results:', result);
    await Promise.all(store.dispatch(StarAPI.util.getRunningQueriesThunk()));
    return {props: {}};
});
