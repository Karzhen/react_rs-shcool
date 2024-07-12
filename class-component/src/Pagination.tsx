import React from 'react';
import { PaginationProps } from './types';
import styles from './Pagination.module.css';

const Pagination: React.FC<PaginationProps> = ({
    next,
    prev,
    handleNextPage,
    handlePrevPage,
}) => {
    return (
        <div className={styles.pagination}>
            {prev && (
                <button
                    className={styles['pagination-button']}
                    onClick={handlePrevPage}
                >
                    Prev Page
                </button>
            )}
            {next && (
                <button
                    className={styles['pagination-button']}
                    onClick={handleNextPage}
                >
                    Next Page
                </button>
            )}
        </div>
    );
};

export default Pagination;
