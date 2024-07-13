import React, { useState, ChangeEvent, useEffect } from 'react';
import styles from './SearchInput.module.css';
import { SearchInputProps } from '../../types.ts';
import useLocalStorage from '../../hooks/useLocalStorage.ts';

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const [input, setInput] = useState('');
    const [storedSearchTerm, setStoredSearchTerm] = useLocalStorage(
        'lastSearchTerm',
        '',
    );

    useEffect(() => {
        setInput(storedSearchTerm);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSearch = () => {
        const trimmedInput = input.trim();
        // console.log(`'${trimmedInput}'`)
        setStoredSearchTerm(trimmedInput);
        onSearch(trimmedInput);
    };

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Enter search term"
            />
            <button className={styles.button} onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchInput;
