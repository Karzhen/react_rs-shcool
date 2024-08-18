import React from 'react';
import { FieldError } from 'react-hook-form';
import styles from './FileInput.module.css';
import FormError from '../FormError/FormError.tsx';

interface FileInputProps {
    id: string;
    label: string;
    register: any;
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
