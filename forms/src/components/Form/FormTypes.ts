import { FieldErrors, UseFormRegister } from 'react-hook-form';
import React from 'react';

export type FormProps = {
    register: UseFormRegister<MyForm>;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    errors: FieldErrors<MyForm>;
};

export type MyForm = {
    name: string;
    age: number;
    email: string;
    password: string;
    confirm_password: string;
    country: string;
    gender: string;
    image: FileList;
    acceptTermsAndConditions: boolean;
};
