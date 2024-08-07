import { configureStore } from '@reduxjs/toolkit';
import { StarAPI } from './starAPI';
import selectedCharactersReducer from './selectedCharactersSlice';
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
    reducer: {
        [StarAPI.reducerPath]: StarAPI.reducer,
        selectedCharacters: selectedCharactersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(StarAPI.middleware),
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<typeof store['dispatch']>;

export const wrapper = createWrapper(store, { debug: true });
