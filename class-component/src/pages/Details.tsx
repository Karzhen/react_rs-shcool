import React, {useEffect, useRef, useState} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage.tsx';
import styles from './Details.module.css';
import { Character, Nullable } from '../types.ts';
import CharacterDetail from '../components/Character/CharacterDetail.tsx';

interface DetailsProps {
    // onClose: () => void;
}

const fetchFilmTitles = async (filmUrls: string[]): Promise<string[]> => {
    const fetchedTitles = await Promise.all(
        filmUrls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch film data from ${url}`);
            }
            const data = await response.json();
            return data.title;
        }),
    );
    console.log(fetchedTitles);
    return fetchedTitles;
};

const fetchHomeworldName = async (url: string): Promise<string> => {
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
};

const fetchVehicleNames = async (vehicleUrls: string[]): Promise<string[]> => {
    const vehicleNames = await Promise.all(
        vehicleUrls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch vehicle data from ${url}`);
            }
            const data = await response.json();
            return data.name;
        }),
    );
    return vehicleNames;
};

const Details: React.FC<DetailsProps> = () => {
    const location = useLocation();
    console.log(location);
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Nullable<Character>>(null);
    const navigate = useNavigate();
    console.log(character);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Nullable<Error>>(null);
    const previousPath = useRef<string | null>(null);

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
        navigate(location.pathname.split('/details')[0]);
    };

    return (
        <div className={styles.details}>
            <button onClick={handleCloseDetails}>Close</button>
            {character && (
                <div className={styles.container}>
                    <div>
                        <h1>{character.name}</h1>
                        <p>Height: {character.height}</p>
                        <p>Height: {character.height}</p>
                        <p>Mass: {character.mass}</p>
                        <p>Hair Color: {character.hair_color}</p>
                        <p>Skin Color: {character.skin_color}</p>
                        <p>Eye Color: {character.eye_color}</p>
                        <p>Birth Year: {character.birth_year}</p>
                        <p>Gender: {character.gender}</p>
                        {character.homeworld && (
                            <CharacterDetail
                                label="Homeworld"
                                value={character.homeworld}
                            />
                        )}
                        <p>
                            <strong>Films:</strong>
                        </p>
                        <ul>
                            {character.films.map((film, index) => (
                                <li key={index}>{film}</li>
                            ))}
                        </ul>
                        <p>
                            <strong>Vehicles:</strong>
                        </p>
                        <ul>
                            {character.vehicles.map((vehicle, index) => (
                                <li key={index}>{vehicle}</li>
                            ))}
                        </ul>
                    </div>
                    <img
                        src={`/images/characters/${character.name.toLowerCase().replace(/ /g, '_')}.png`}
                        alt={character.name}
                        className={styles['character-image']}
                    />
                </div>
            )}
        </div>
    );
};

export default Details;
