import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import countriesData from './countries.json';

const initialCountries = countriesData.countries;

interface CountriesState {
    initialCountries: string[];
}

const initialState: CountriesState = {
    initialCountries: countriesData.countries,
};


const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries(state, action: PayloadAction<string[]>) {
            state.countries = action.payload;
        },
    },
});

export const { setCountries } = countriesSlice.actions;

export default countriesSlice.reducer;
