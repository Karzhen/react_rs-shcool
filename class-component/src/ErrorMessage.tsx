import React from 'react';
import { ErrorMessageProps } from './types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    if (!error) return null;
    return <p>Error: {error.message}</p>;
};

export default ErrorMessage;
