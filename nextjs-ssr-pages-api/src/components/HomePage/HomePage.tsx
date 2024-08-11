// import React, { CSSProperties, ReactNode } from 'react';
// import { useRouter } from 'next/router';
// import SearchInput from '../SearchInput/SearchInput';
// import SearchResults from '../SearchResults/SearchResults';
// import { useTheme } from '@/ThemeContext';
// import Dropdown from '../DropDown/DropDown';
// import { useSearch } from '@/hooks/useSearch';
// import styles from './HomePage.module.css';
// import {wrapper} from "@/redux/store";
//
// interface LayoutHomeProps {
//     children: React.ReactNode;
// }
//
// const HomePage: React.FC = ({ children }: LayoutHomeProps) => {
//     // const router = useRouter();
//     // const { id } = router.query;
//     // console.log(id)
//     const { themeColors } = useTheme();
//
//     const {
//         searchTerm,
//         currentPage,
//         handleSearch,
//         handleNextPage,
//         handlePrevPage,
//     } = useSearch();
//
//     return (
//         <div
//             className={styles['home-page']}
//             style={{ ...(themeColors as CSSProperties) }}
//         >
//             <SearchInput onSearch={handleSearch} />
//             <Dropdown />
//             <div className={styles['content']}>
//                 <SearchResults
//                     searchTerm={searchTerm}
//                     currentPage={currentPage}
//                     handleNextPage={handleNextPage}
//                     handlePrevPage={handlePrevPage}
//                 />
//                 {children}
//             </div>
//         </div>
//     );
// };
//
// export default HomePage;
//
// export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
//
// });