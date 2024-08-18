import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import styles from './SelectInput.module.css';
import FormError from '../FormError/FormError.tsx';
import { MyForm } from '../Form/FormTypes.ts';

interface SelectInputProps {
    id: string;
    label: string;
    options: string[];
    register: UseFormRegister<MyForm>;
    error?: FieldError;
}

const SelectInput: React.FC<SelectInputProps> = ({
    id,
    label,
    options,
    register,
    error,
}) => (
    <div className={styles.selectInput}>
        <label htmlFor={id}>{label}</label>
        <select id={id} {...register(id)}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && <FormError error={error} />}
    </div>
);

export default SelectInput;
