import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage.tsx';
import styles from './Details.module.css';
import { Character, Nullable } from '../types.ts';

interface DetailsProps {
    onClose: () => void;
}

const Details: React.FC<DetailsProps> = ({ onClose }) => {
    const { id } = useParams<{ id: string }>();
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

    return (
        <div className={styles.details}>
            <button onClick={onClose}>Close</button>
            {character && (
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
                </div>
            )}
        </div>
    );
};

export default Details;
