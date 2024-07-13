import React, { ChangeEvent, useState } from 'react';
import styles from './SearchInput.module.css';
import useLocalStorage from '../hooks/useLocalStorage';
import {SearchInputProps} from "../../types.ts";

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const [input, setInput] = useLocalStorage('lastSearchTerm', '');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSearch = () => {
        onSearch(input.trim());
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
            <button
                className={styles.button}
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchInput;
