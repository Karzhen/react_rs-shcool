import React, {ReactNode, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader/Loader';
// import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import styles from '@/components/Details/Details.module.css';
import { Character, Nullable } from '@/types';
import {
    fetchFilmTitles,
    fetchHomeworldName,
    fetchStarshipNames,
    fetchVehicleNames,
} from '@/utils/fetchPersonal';
import { CharacterInfo } from '@/components/Details/CharacterInfo';
import HomePage from '@/pages';

interface DetailsProps {
    id: string;
}

const Details = () => {
    const router = useRouter();
    const { id } = router.query;
    const [character, setCharacter] = useState<Nullable<Character>>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Nullable<Error>>(null);

    useEffect(() => {
        if (!id) return;

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

    const handleBack = () => {
        console.log(router)
        // const { pathname, search } = window.location;
        const newPathname = router.asPath.replace(/\/details\/\d+/, '');
        console.log(newPathname)
        router.replace(`/${newPathname}`);
    };

    if (isLoading) {
        return (
            <Loader />
        );
    }

    return (
        <div className={styles.container}>
            <button onClick={handleBack}>Close</button>
            {character && <CharacterInfo character={character} />}
        </div>
    );
};

Details.getLayout = function getLayout(Details: ReactNode) {
    return <HomePage>{Details}</HomePage>;
};

export default Details;

