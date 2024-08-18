import React from 'react';
import { FieldError } from 'react-hook-form';
import styles from './FormError.module.css';

interface FormErrorProps {
    error?: FieldError;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
    if (!error) return null;
    return <p className={styles.errorMessage}>{error.message}</p>;
};

export default FormError;
