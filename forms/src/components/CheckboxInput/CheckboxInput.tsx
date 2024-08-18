import React from 'react';
import { FieldError } from 'react-hook-form';
import styles from './CheckboxInput.module.css';
import FormError from '../FormError/FormError.tsx';

interface CheckboxInputProps {
    id: string;
    label: string;
    register: any;
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
