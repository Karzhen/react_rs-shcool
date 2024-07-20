export const handleSearch = (term: string, currentPage, setSearchTerm, setCurrentPage, navigate) => {
    setSearchTerm(term);
    setCurrentPage(1);
    navigate(`/?search=${term.toLowerCase()}&page=${currentPage}`);
};