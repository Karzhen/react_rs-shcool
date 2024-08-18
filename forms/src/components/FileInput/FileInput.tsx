import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import styles from './FileInput.module.css';
import FormError from '../FormError/FormError.tsx';
import { MyForm } from '../Form/FormTypes.ts';

type FormField = "name" | "age" | "email" | "password" | "gender" | "country" | "picture" | "confirm_password" | "acceptTermsAndConditions";

interface FileInputProps {
    id: FormField;
    label: string;
    register: UseFormRegister<MyForm>;
    error?: FieldError;
}

const FileInput: React.FC<FileInputProps> = ({
    id,
    label,
    register,
    error,
}) => (
    <div className={styles.fileInput}>
        <label htmlFor={id} className="input-file">
            {label}
            <input
                type="file"
                id={id}
                accept=".jpg, .jpeg, .png"
                {...register(id)}
            />
            <span>Upload</span>
        </label>
        {error && <FormError error={error} />}
    </div>
);

export default FileInput;
