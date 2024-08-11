import { createAction } from '@reduxjs/toolkit';

export const addCharacter = createAction<number>('characters/add');
export const removeCharacter = createAction<number>('characters/remove');
export const clearCharacters = createAction('characters/clear');
