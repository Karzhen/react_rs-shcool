import React from 'react';
import { Character } from '../../types.ts';
import styles from './Details.module.css';
import CharacterDetail from '../../components/Character/CharacterDetail.tsx';

export const CharacterInfo: React.FC<{ character: Character }> = ({
    character,
}) => (
    <div className={styles.character}>
        <div>
            <h1 className={styles['result-name']}>{character.name}</h1>
            <CharacterDetail label="Height" value={character.height} />
            <CharacterDetail label="Mass" value={character.mass} />
            <CharacterDetail label="Hair Color" value={character.hair_color} />
            <CharacterDetail label="Skin Color" value={character.skin_color} />
            <CharacterDetail label="Eye Color" value={character.eye_color} />
            <CharacterDetail label="Birth Year" value={character.birth_year} />
            <CharacterDetail label="Gender" value={character.gender} />
            {character.homeworld && (
                <CharacterDetail
                    label="Homeworld"
                    value={character.homeworld}
                />
            )}
            <CharacterDetail label="Films" />
            <ul>
                {character.films.map((film, index) => (
                    <CharacterDetail key={index} value={film} />
                ))}
            </ul>
            <CharacterDetail label="Vehicles" />
            <ul>
                {character.vehicles.map((vehicle, index) => (
                    <CharacterDetail key={index} value={vehicle} />
                ))}
            </ul>
        </div>
        <img
            src={`/images/characters/${character.name.toLowerCase().replace(/ /g, '_')}.png`}
            alt={character.name}
            className={styles['character-image']}
        />
    </div>
);
