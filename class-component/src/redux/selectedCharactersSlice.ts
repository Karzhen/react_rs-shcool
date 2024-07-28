import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateCharacter } from '../types';

interface SelectedCharactersState {
    selected: StateCharacter[];
}

const initialState: SelectedCharactersState = {
    selected: [],
};

const selectedCharactersSlice = createSlice({
    name: 'selectedCharacters',
    initialState,
    reducers: {
        addCharacter: (state, action: PayloadAction<StateCharacter>) => {
            console.log('Добавление персонажа:', action.payload);
            const existingCharacter = state.selected.find(
                (c) => c.id === action.payload.id,
            );
            if (!existingCharacter) {
                state.selected.push(action.payload);
            }
        },
        removeCharacter: (state, action: PayloadAction<string>) => {
            console.log('Удаление персонажа:', action.payload);
            state.selected = state.selected.filter(
                (character) => character.id !== action.payload.toString(),
            );
        },
        clearCharacters: (state) => {
            console.log('Удаление всех персонажей:');
            state.selected = [];
        },
    },
});

export const { addCharacter, removeCharacter, clearCharacters } =
    selectedCharactersSlice.actions;
export default selectedCharactersSlice.reducer;
