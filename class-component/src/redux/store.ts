import { configureStore } from '@reduxjs/toolkit';
import { StarAPI } from './starAPI';
import selectedCharactersReducer from './selectedCharactersSlice';

export const store = configureStore({
    reducer: {
        [StarAPI.reducerPath]: StarAPI.reducer,
        selectedCharacters: selectedCharactersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(StarAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
