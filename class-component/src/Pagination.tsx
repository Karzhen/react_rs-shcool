import React from 'react';

type PaginationProps = {
    next: string | null;
    prev: string | null;
    handleNextPage: () => void;
    handlePrevPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
    next,
    prev,
    handleNextPage,
    handlePrevPage,
}) => {
    return (
        <div className="pagination">
            {prev && <button onClick={handlePrevPage}>Prev Page</button>}
            {next && <button onClick={handleNextPage}>Next Page</button>}
        </div>
    );
};

export default Pagination;
