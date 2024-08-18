import { createSlice } from '@reduxjs/toolkit';

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
            state.uncontrolledFormData = action.payload;
        },
        submitControlled(state, action) {
            state.hookFormData = action.payload;
        },
        setControlledImage(state, action) {
            state.hookFormData.image = action.payload;
        },
        setUncontrolledImage(state, action) {
            state.uncontrolledFormData.image = action.payload;
        },
    },
});

export const {
    submitUncontrolled,
    submitControlled,
    setControlledImage,
    setUncontrolledImage,
} = formDataSlice.actions;
export default formDataSlice.reducer;
