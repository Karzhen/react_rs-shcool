import { Component, ChangeEvent } from 'react';
import styles from './SearchInput.module.css';

type SearchInputProps = {
    onSearch: (input: string) => void;
};

type SearchInputState = {
    input: string;
};
const lastSearchTerm = localStorage.getItem('lastSearchTerm') || '';

class SearchInput extends Component<SearchInputProps, SearchInputState> {

    constructor(props: SearchInputProps) {
        super(props);
        this.state = {
            input: lastSearchTerm,
        };
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                <button className={styles.button} onClick={this.handleSearch}>
                    Search
                </button>
            </div>
        );
    }
}

export default SearchInput;
