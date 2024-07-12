import { Component } from 'react';
import styles from './SearchResults.module.css';
import CharacterCard from './CharacterCard.tsx';

type SearchResultsProps = {
    results: Character[];
};

type Character = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
};

class SearchResults extends Component<
    SearchResultsProps,
    Record<string, never>
> {
    render() {
        const { results } = this.props;

        // Искусственно вызываем ошибку для тестирования ErrorBoundary
        // if (results.length > 0 && results[0].name === 'Luke Skywalker') {
        //     throw new Error('Test error');
        // }

        return (
            <div className={styles.container}>
                {results.length > 0 ? (
                    <div className={styles.grid}>
                        {results.map((result, index) => (
                            <CharacterCard key={index} character={result} />
                        ))}
                    </div>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        );
    }
}

export default SearchResults;
