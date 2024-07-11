import React from 'react';
import styles from './CharacterCard.module.css';

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

type CharacterCardProps = {
    character: Character;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    return (
        <div className={styles.card}>
            <div className={styles['card-header']}>
                <h3 className={styles['result-name']}>{character.name}</h3>
                <img
                    src={`/images/characters/${character.name.toLowerCase().replace(/ /g, '_')}.png`}
                    alt={character.name}
                    className={styles['character-image']}
                />
            </div>
            <p>
                <strong>Height:</strong> {character.height}
            </p>
            <p>
                <strong>Mass:</strong> {character.mass}
            </p>
            <p>
                <strong>Hair Color:</strong> {character.hair_color}
            </p>
            <p>
                <strong>Skin Color:</strong> {character.skin_color}
            </p>
            <p>
                <strong>Eye Color:</strong> {character.eye_color}
            </p>
            <p>
                <strong>Birth Year:</strong> {character.birth_year}
            </p>
            <p>
                <strong>Gender:</strong> {character.gender}
            </p>
            <p>
                <strong>Homeworld:</strong> {character.homeworld}
            </p>
            <p>
                <strong>Films:</strong>
            </p>
            <ul>
                {character.films.map((film, index) => (
                    <li key={index}>{film}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterCard;
