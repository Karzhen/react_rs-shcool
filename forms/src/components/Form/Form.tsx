import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './Form.css';
import { FormProps } from './FormTypes.ts';

import TextInput from '../TextInput/TextInput';
import SelectInput from '../SelectInput/SelectInput';
import RadioInput from '../RadioInput/RadioInput';
import FileInput from '../FileInput/FileInput';
import CheckboxInput from '../CheckboxInput/CheckboxInput';

export default function Form({ register, handleSubmit, errors }: FormProps) {
    const countries = useSelector(
        (state: RootState) => state.countries.initialCountries
    );

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                id="name"
                label="Name"
                type="text"
                placeholder="Name..."
                register={register}
                error={errors.name}
            />
            <TextInput
                id="age"
                label="Age"
                type="number"
                placeholder="18"
                register={register}
                error={errors.age}
            />
            <TextInput
                id="email"
                label="Email"
                type="text"
                placeholder="email@gmail.com"
                register={register}
                error={errors.email}
            />
            <TextInput
                id="password"
                label="Password"
                type="text"
                placeholder="Password123!"
                register={register}
                error={errors.password}
            />
            <TextInput
                id="confirmPassword"
                label="Confirm password"
                type="text"
                placeholder="Password123!"
                register={register}
                error={errors.confirm_password}
            />

            <SelectInput
                id="country"
                label="Choose country"
                options={countries}
                register={register}
                error={errors.country}
            />

            <RadioInput
                name="gender"
                options={[
                    { id: 'male', label: 'Male', value: 'male' },
                    { id: 'female', label: 'Female', value: 'female' },
                ]}
                register={register}
                error={errors.gender}
            />

            <FileInput
                id="image"
                label="Upload image"
                register={register}
                error={errors.image}
            />

            <CheckboxInput
                id="acceptTerms"
                label="accept Terms and Conditions"
                register={register}
                error={errors.acceptTermsAndConditions}
            />

            <button>Submit</button>
        </form>
    );
}
