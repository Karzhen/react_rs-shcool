import React from 'react';
import { Nullable } from './types';

type ErrorMessageProps = {
    error: Nullable<Error>;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    if (!error) return null;
    return <p>Error: {error.message}</p>;
};

export default ErrorMessage;
