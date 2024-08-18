import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './slices/formDataSlice';
import countriesReducer from './slices/countriesSlice';

const store = configureStore({
    reducer: {
        formData: formDataReducer,
        countries: countriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
