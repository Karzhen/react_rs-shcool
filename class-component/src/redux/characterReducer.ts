import { createReducer } from '@reduxjs/toolkit';
import { addCharacter, removeCharacter, clearCharacters } from './actions';

interface CharactersState {
    selected: number[];
}

const initialState: CharactersState = {
    selected: [],
};

const charactersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addCharacter, (state, action) => {
            if (!state.selected.includes(action.payload)) {
                state.selected.push(action.payload);
            }
        })
        .addCase(removeCharacter, (state, action) => {
            state.selected = state.selected.filter(
                (id) => id !== action.payload,
            );
        })
        .addCase(clearCharacters, (state) => {
            state.selected = [];
        });
});

export default charactersReducer;
