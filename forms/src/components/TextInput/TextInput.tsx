import React from 'react';
import { FieldError } from 'react-hook-form';
import styles from './TextInput.module.css';
import FormError from '../FormError/FormError.tsx';

interface TextInputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    register: any;
    error?: FieldError;
}

const TextInput: React.FC<TextInputProps> = ({
    id,
    label,
    type,
    placeholder,
    register,
    error,
}) => (
    <div className={styles.textInput}>
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            {...register(id)}
        />
        {error && <FormError error={error} />}
    </div>
);

export default TextInput;
