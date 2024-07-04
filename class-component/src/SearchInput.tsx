import React, { Component } from 'react';
import styles from './SearchInput.module.css';

type SearchInputProps  =  {
    onSearch: (input: string) => void;
}

type SearchInputState = {
    input: string;
}

class SearchInput extends Component<SearchInputProps, SearchInputState>  {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }

    handleChange = (event) => {
        this.setState({ input: event.target.value });
    };

    handleSearch = () => {
        const { input } = this.state;
        this.props.onSearch(input.trim());
    };

    render() {
        return (
            <div className={styles.container}>
                <input
                    type="text"
                    value={this.state.input}
                    onChange={this.handleChange}
                    placeholder="Enter search term"
                />
                <button className={styles.button} onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default SearchInput;
