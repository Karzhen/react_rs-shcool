import React from 'react';
import CharacterDetail from './CharacterDetail.tsx';
import styles from './CharacterCard.module.css';
import { CharacterCardProps } from '../../types.ts';

const CharacterCard: React.FC<CharacterCardProps> = ({
    character,
    onClick,
    isChecked,
    onCheckboxChange,
}) => {
    const {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
    } = character;

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.stopPropagation();
        onCheckboxChange(event);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card} onClick={onClick}>
                <div className={styles['card-header']}>
                    <h3 className={styles['result-name']}>{name}</h3>
                    {/*<img*/}
                    {/*    src={`/images/characters/${name.toLowerCase().replace(/ /g, '_')}.png`}*/}
                    {/*    alt={name}*/}
                    {/*    className={styles['character-image']}*/}
                    {/*/>*/}
                </div>
                {height && <CharacterDetail label="Height" value={height} />}
                {mass && <CharacterDetail label="Mass" value={mass} />}
                {gender && <CharacterDetail label="Gender" value={gender} />}
                {birth_year && (
                    <CharacterDetail label="Birth Year" value={birth_year} />
                )}
                {skin_color && (
                    <CharacterDetail label="Skin Color" value={skin_color} />
                )}
                {hair_color && (
                    <CharacterDetail label="Hair Color" value={hair_color} />
                )}
                {eye_color && (
                    <CharacterDetail label="Eye Color" value={eye_color} />
                )}
            </div>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
            />
        </div>
    );
};

export default CharacterCard;
