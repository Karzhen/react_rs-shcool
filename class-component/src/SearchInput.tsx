import { Component, ChangeEvent } from 'react';
import styles from './SearchInput.module.css';

type SearchInputProps = {
    onSearch: (input: string) => void;
};

type SearchInputState = {
    input: string;
};
const lastSearchTerm = localStorage.getItem('lastSearchTerm') || '';
alert('Добрый день! Данного предупреждения нет на github, оно только в деплое. Я немного накосячил со ссылкой для cross-check, поэтому добавил ссылку на PR в верхней странице сайта')

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
            <>
                <a href="https://github.com/Karzhen/react_rs-shcool/pull/1" className={styles.link}>Ссылка на PR. Прошу понять и простить</a>
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
            </>
        );
    }
}

export default SearchInput;
