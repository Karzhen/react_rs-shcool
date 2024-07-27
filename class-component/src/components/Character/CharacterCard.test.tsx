import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import CharacterCard from './CharacterCard';
import CharacterDetail from './CharacterDetail';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { addCharacter, removeCharacter } from '../../redux/selectedCharactersSlice';
import { fetchHomeworldName, fetchFilmTitles, fetchStarshipNames, fetchVehicleNames } from '../../utils/fetchPersonal';

// Мокирование функций
vi.mock('../../utils/fetchPersonal', () => ({
    fetchHomeworldName: vi.fn(() => Promise.resolve('Tatooine')),
    fetchFilmTitles: vi.fn(() => Promise.resolve(['A New Hope', 'The Empire Strikes Back'])),
    fetchStarshipNames: vi.fn(() => Promise.resolve(['TIE Fighter'])),
    fetchVehicleNames: vi.fn(() => Promise.resolve([])),
}));

// Мокирование redux
const mockDispatch = vi.fn();
vi.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
    useSelector: (selector: (state: RootState) => any) => selector({
        selectedCharacters: {
            selected: [{ id: '4', name: 'Darth Vader' }],
        },
    }),
}));

describe('CharacterCard Component', () => {
    const character = {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        hair_color: 'none',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        gender: 'male',
        url: 'https://swapi.dev/api/people/4/',
        homeworld: 'https://swapi.dev/api/planets/1/',
        films: [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/6/"
        ],
        vehicles: [],
        starships: [
            "https://swapi.dev/api/starships/13/"
        ],
    };

    test('renders character details correctly and interacts as expected', async () => {
        const mockOnClick = vi.fn();

        render(<CharacterCard character={character} onClick={mockOnClick} />);

        // Проверяем наличие имени персонажа
        expect(screen.getByText('Darth Vader')).toBeInTheDocument();

        // Проверяем наличие всех деталей персонажа
        const details = [
            { label: 'Height', value: '202' },
            { label: 'Mass', value: '136' },
            { label: 'Gender', value: 'male' },
            { label: 'Birth Year', value: '41.9BBY' },
            { label: 'Skin Color', value: 'white' },
            { label: 'Hair Color', value: 'none' },
            { label: 'Eye Color', value: 'yellow' },
        ];

        details.forEach(({ label, value }) => {
            expect(screen.getByText(`${label}:`)).toBeInTheDocument();
            expect(screen.getByText(value)).toBeInTheDocument();
        });

        // Проверяем наличие чекбокса и его состояние
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked(); // Проверяем, что чекбокс отмечен

        // Проверяем, что функция onClick вызвана при клике на карточку
        fireEvent.click(screen.getByText('Darth Vader'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);

        // Проверяем, что dispatch вызывается при изменении состояния чекбокса
        fireEvent.click(checkbox);
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(removeCharacter('4'));
        });
    });
});
