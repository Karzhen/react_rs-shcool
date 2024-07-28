import { describe, test, expect } from 'vitest';
import reducer, {
    addCharacter,
    removeCharacter,
    clearCharacters,
} from './selectedCharactersSlice';
import { StateCharacter } from '../types';

const mockCharacter: StateCharacter = {
    id: '4',
    name: 'Darth Vader',
    height: '202',
    mass: '136',
    hair_color: 'none',
    skin_color: 'white',
    eye_color: 'yellow',
    birth_year: '41.9BBY',
    gender: 'male',
    homeworld: 'Tatooine',
    films: [
        'A New Hope',
        'The Empire Strikes Back',
        'Return of the Jedi',
        'Revenge of the Sith',
    ],
    url: 'https://swapi.dev/api/people/4/',
    starships: ['TIE Advanced x1'],
    vehicles: [],
};

describe('selectedCharactersSlice', () => {
    test('should return the initial state', () => {
        const initialState = { selected: [] };
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });

    test('should handle addCharacter', () => {
        const previousState = { selected: [] };
        const newState = reducer(previousState, addCharacter(mockCharacter));
        expect(newState.selected).toContainEqual(mockCharacter);
    });

    test('should not add the same character twice', () => {
        const previousState = { selected: [mockCharacter] };
        const newState = reducer(previousState, addCharacter(mockCharacter));
        expect(newState.selected.length).toBe(1);
    });

    test('should handle removeCharacter', () => {
        const previousState = { selected: [mockCharacter] };
        const newState = reducer(
            previousState,
            removeCharacter(mockCharacter.id),
        );
        expect(newState.selected).toEqual([]);
    });

    test('should handle clearCharacters', () => {
        const previousState = { selected: [mockCharacter] };
        const newState = reducer(previousState, clearCharacters());
        expect(newState.selected).toEqual([]);
    });
});
