import { Component } from 'react';
import styles from './SearchResults.module.css';

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
                            <div key={index} className={styles.card}>
                                <div className={styles['card-header']}>
                                    <h3 className={styles['result-name']}>
                                        {result.name}
                                    </h3>
                                    <img
                                        src={`/images/characters/${result.name.toLowerCase().replace(/ /g, '_')}.png`}
                                        alt={result.name}
                                        className={styles['character-image']}
                                    />
                                </div>
                                <p>
                                    <strong>Height:</strong> {result.height}
                                </p>
                                <p>
                                    <strong>Mass:</strong> {result.mass}
                                </p>
                                <p>
                                    <strong>Hair Color:</strong>{' '}
                                    {result.hair_color}
                                </p>
                                <p>
                                    <strong>Skin Color:</strong>{' '}
                                    {result.skin_color}
                                </p>
                                <p>
                                    <strong>Eye Color:</strong>{' '}
                                    {result.eye_color}
                                </p>
                                <p>
                                    <strong>Birth Year:</strong>{' '}
                                    {result.birth_year}
                                </p>
                                <p>
                                    <strong>Gender:</strong> {result.gender}
                                </p>
                                <p>
                                    <strong>Homeworld:</strong>{' '}
                                    {result.homeworld}
                                </p>
                                <p>
                                    <strong>Films:</strong>
                                </p>
                                <ul>
                                    {result.films.map((film, filmIndex) => (
                                        <li key={filmIndex}>{film}</li>
                                    ))}
                                </ul>
                            </div>
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
