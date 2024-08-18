import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
    name: string;
    age: number;
    email: string;
    password: string;
    gender: string;
    termsAccepted: boolean;
    country: string;
    picture: string; // base64
}

interface FormDataState {
    uncontrolledFormData: FormData[];
    hookFormData: FormData[];
}

const initialState: FormDataState = {
    uncontrolledFormData: [],
    hookFormData: [],
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        submitUncontrolled(state, action) {
            state.uncontrolled = action.payload;
        },
        submitControlled(state, action) {
            state.controlled = action.payload;
        },
        setControlledImage(state, action) {
            state.controlled.image = action.payload;
        },
        setUncontrolledImage(state, action) {
            state.uncontrolled.image = action.payload;
        },
    },
});

export const { submitUncontrolled, submitControlled, setControlledImage, setUncontrolledImage } =
    formDataSlice.actions;
export default formDataSlice.reducer;

