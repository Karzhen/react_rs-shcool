import React, { Component } from 'react';
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

class SearchResults extends Component<SearchResultsProps, {}> {
    render() {
        const { results } = this.props;

        return (
            <div className={styles.container}>
                {results.length > 0 ? (
                    <ul className={styles.resultList}>
                        {results.map((result, index) => (
                            <li key={index} className={styles.resultItem}>
                                <h3 className={styles.resultName}>{result.name}</h3>
                                <p><strong>Height:</strong> {result.height}</p>
                                <p><strong>Mass:</strong> {result.mass}</p>
                                <p><strong>Hair Color:</strong> {result.hair_color}</p>
                                <p><strong>Skin Color:</strong> {result.skin_color}</p>
                                <p><strong>Eye Color:</strong> {result.eye_color}</p>
                                <p><strong>Birth Year:</strong> {result.birth_year}</p>
                                <p><strong>Gender:</strong> {result.gender}</p>
                                <p><strong>Homeworld:</strong> {result.homeworld}</p>
                                <p><strong>Films:</strong></p>
                                <ul>
                                    {result.films.map((film, filmIndex) => (
                                        <li key={filmIndex}>{film}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        );
    }
}

export default SearchResults;