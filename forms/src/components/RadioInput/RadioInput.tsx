import React from 'react';
import { FieldError } from 'react-hook-form';
import styles from './RadioInput.module.css';
import FormError from '../FormError/FormError.tsx';

interface RadioInputProps {
    name: string;
    options: { id: string; label: string; value: string }[];
    register: any;
    error?: FieldError;
}

const RadioInput: React.FC<RadioInputProps> = ({
    name,
    options,
    register,
    error,
}) => (
    <div className={styles.radioInput}>
        {options.map((option) => (
            <label key={option.id} htmlFor={option.id}>
                {option.label}
                <input
                    type="radio"
                    id={option.id}
                    value={option.value}
                    {...register(name)}
                />
            </label>
        ))}
        {error && <FormError error={error} />}
    </div>
);

export default RadioInput;
