import React from 'react';
import CharacterDetail from './CharacterDetail.tsx';
import styles from './CharacterCard.module.css';
import { CharacterCardProps } from '../../types.ts';
// import { useFetchHomeworldName } from '../../hooks/useFetchHomeworldName.tsx';
// import { useFetchFilmTitles } from '../../hooks/useFetchFilmTitle.tsx';

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    const {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
        homeworld,
        films,
    } = character;

    // const filmTitles = useFetchFilmTitles(films);
    // const homeworldName = useFetchHomeworldName(homeworld);

    return (
        <div className={styles.card}>
            <div className={styles['card-header']}>
                <h3 className={styles['result-name']}>{name}</h3>
                <img
                    src={`/images/characters/${name.toLowerCase().replace(/ /g, '_')}.png`}
                    alt={name}
                    className={styles['character-image']}
                />
            </div>
            {height && <CharacterDetail label="Height" value={height} />}
            {mass && <CharacterDetail label="Mass" value={mass} />}
            {hair_color && (
                <CharacterDetail label="Hair Color" value={hair_color} />
            )}
            {skin_color && (
                <CharacterDetail label="Skin Color" value={skin_color} />
            )}
            {eye_color && (
                <CharacterDetail label="Eye Color" value={eye_color} />
            )}
            {birth_year && (
                <CharacterDetail label="Birth Year" value={birth_year} />
            )}
            {gender && <CharacterDetail label="Gender" value={gender} />}
            {homeworld && (
                <CharacterDetail label="Homeworld" value={homeworld} />
            )}
            <p>
                <strong>Films:</strong>
            </p>
            <ul>
                {films.map((film, index) => (
                    <li key={index}>{film}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterCard;
