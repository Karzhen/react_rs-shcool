import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../Loader/Loader';
import styles from './Details.module.css';
import { Character, Nullable } from '../../types';
import {
    fetchFilmTitles,
    fetchHomeworldName,
    fetchStarshipNames,
    fetchVehicleNames,
} from '../../utils/fetchPersonal';
import {CharacterInfo} from './CharacterInfo';

const Details: React.FC<{ id: string }> = ({ id }) => {
    const router = useRouter();
    const [character, setCharacter] = useState<Nullable<Character>>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Nullable<Error>>(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://swapi.dev/api/people/${id}/`,
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch character details');
                }
                const data = await response.json();
                data.homeworld = await fetchHomeworldName(data.homeworld);
                data.films = await fetchFilmTitles(data.films);
                data.vehicles = await fetchVehicleNames(data.vehicles);
                data.starships = await fetchStarshipNames(data.starships);

                setCharacter(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    const handleCloseDetails = () => {
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <button onClick={handleCloseDetails}>Close</button>
            {character && <CharacterInfo character={character} />}
        </div>
    );
};

export default Details;