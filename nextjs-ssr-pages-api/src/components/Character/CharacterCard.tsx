import React from 'react';
import CharacterDetail from './CharacterDetail.tsx';
import styles from './CharacterCard.module.css';
import { CharacterCardProps } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import {
    addCharacter,
    removeCharacter,
} from '../../redux/selectedCharactersSlice';
import extractIdFromUrl from '../../utils/extractIdFromUrl.ts';
import {
    fetchFilmTitles,
    fetchStarshipNames,
    fetchVehicleNames,
    fetchHomeworldName,
} from '../../utils/fetchPersonal.ts';

const CharacterCard: React.FC<CharacterCardProps> = ({
    character,
    onClick,
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

    const ID: string = extractIdFromUrl(character.url);

    const dispatch = useDispatch();
    const selectedCharacters = useSelector(
        (state: RootState) => state.selectedCharacters.selected,
    );
    const isChecked = selectedCharacters.some((c) => c.id === ID);

    const handleCheckboxChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.stopPropagation();
        if (event.target.checked) {
            const enrichedCharacter = {
                ...character,
                id: ID,
                homeworld: await fetchHomeworldName(character.homeworld),
                films: await fetchFilmTitles(character.films),
                vehicles: await fetchVehicleNames(character.vehicles),
                starships: await fetchStarshipNames(character.starships),
            };
            dispatch(addCharacter(enrichedCharacter));
        } else {
            dispatch(removeCharacter(ID));
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card} onClick={onClick}>
                <div className={styles['card-header']}>
                    <h3 className={styles['result-name']}>{name}</h3>
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
