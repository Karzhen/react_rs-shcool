import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import styles from './CheckboxInput.module.css';
import FormError from '../FormError/FormError.tsx';
import { MyForm } from '../Form/FormTypes.ts';

interface CheckboxInputProps {
    id: string;
    label: string;
    register: UseFormRegister<MyForm>;
    error?: FieldError;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
    id,
    label,
    register,
    error,
}) => (
    <div className={styles.checkboxInput}>
        <label htmlFor={id}>
            <input
                type="checkbox"
                id={id}
                {...register(id, { required: true })}
            />
            {label}
        </label>
        {error && <FormError error={error} />}
    </div>
);

export default CheckboxInput;
