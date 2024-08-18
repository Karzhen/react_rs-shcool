import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    termsAccepted: boolean;
    country: string;
    picture: FileList;
}

const HookForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Поля формы */}
            <input
                {...register('name', { required: true })}
                placeholder="Name"
            />
            {errors.name && <span>This field is required</span>}

            {/* Добавьте остальные поля формы */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default HookForm;
