import { describe, test, expect } from 'vitest';
import { addCharacter, removeCharacter, clearCharacters } from './actions';

describe('Character actions', () => {
    test('addCharacter creates correct action', () => {
        const payload = 1;
        const action = addCharacter(payload);
        expect(action).toEqual({ type: 'characters/add', payload });
    });

    test('removeCharacter creates correct action', () => {
        const payload = 1;
        const action = removeCharacter(payload);
        expect(action).toEqual({ type: 'characters/remove', payload });
    });

    test('clearCharacters creates correct action', () => {
        const action = clearCharacters();
        expect(action).toEqual({ type: 'characters/clear' });
    });
});
