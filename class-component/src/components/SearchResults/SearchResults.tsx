import { Component } from 'react';
import styles from './SearchResults.module.css';
import CharacterCard from '../Character/CharacterCard.tsx';
import { SearchResultsProps } from '../../types.ts';

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
