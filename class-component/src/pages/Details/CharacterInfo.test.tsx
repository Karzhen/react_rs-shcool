import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import { CharacterInfo } from './CharacterInfo';
import { Character } from '../../types.ts';

describe('CharacterInfo Component', () => {
    const character: Character = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'Tatooine',
        films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
        vehicles: ['Snowspeeder', 'Imperial Speeder Bike'],
        starships: ['X-wing', 'Imperial shuttle'],
        url: 'https://swapi.dev/api/people/1/',
    };

    test('renders character information correctly', () => {
        render(<CharacterInfo character={character} />);

        // Проверяем наличие имени персонажа
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

        // Проверяем наличие всех деталей персонажа
        const details = [
            { label: 'Height', value: '172' },
            { label: 'Mass', value: '77' },
            { label: 'Hair Color', value: 'blond' },
            { label: 'Skin Color', value: 'fair' },
            { label: 'Eye Color', value: 'blue' },
            { label: 'Birth Year', value: '19BBY' },
            { label: 'Gender', value: 'male' },
            { label: 'Homeworld', value: 'Tatooine' },
        ];

        details.forEach(({ label, value }) => {
            expect(screen.getByText(`${label}:`)).toBeInTheDocument();
            expect(screen.getByText(value)).toBeInTheDocument();
        });

        // Проверяем наличие списка фильмов
        const filmTitles = [
            'A New Hope',
            'The Empire Strikes Back',
            'Return of the Jedi',
        ];

        filmTitles.forEach((title) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });

        // Проверяем наличие списка транспортных средств
        const vehicles = ['Snowspeeder', 'Imperial Speeder Bike'];

        vehicles.forEach((vehicle) => {
            expect(screen.getByText(vehicle)).toBeInTheDocument();
        });

        // Проверяем наличие изображения персонажа
        const image = screen.getByAltText('Luke Skywalker');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute(
            'src',
            '/images/characters/luke_skywalker.png',
        );
    });
});
