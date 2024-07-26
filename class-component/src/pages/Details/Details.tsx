import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader.tsx';
import ErrorMessage from '../../ErrorMessage.tsx';
import styles from './Details.module.css';
import { Character, Nullable } from '../../types.ts';
import {
    fetchFilmTitles,
    fetchHomeworldName,
    fetchStarshipNames,
    fetchVehicleNames,
} from '../../utils/fetchPersonal.ts';
import { CharacterInfo } from './CharacterInfo.tsx';

const Details: React.FC = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Nullable<Character>>(null);
    const navigate = useNavigate();
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

    if (error) {
        return <ErrorMessage error={error} />;
    }

    const handleCloseDetails = () => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search') || '';
        const page = params.get('page') || '1';

        navigate(`/?search=${search}&page=${page}`);
    };

    return (
        <div className={styles.container}>
            <button onClick={handleCloseDetails}>Close</button>
            {character && <CharacterInfo character={character} />}
        </div>
    );
};

export default Details;
