import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
    setUncontrolledImage,
    submitUncontrolled,
} from '../../store/slices/formDataSlice.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from '../../components/Form/Form';
import { MyForm } from '../../components/Form/FormTypes.ts';
import { formSchema } from '../../Validations/formValidation.ts';
import styles from './UncontrolledForm.module.css';

const UncontrolledForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<MyForm>({
        mode: 'onSubmit',
        resolver: yupResolver(formSchema),
    });

    const submit: SubmitHandler<MyForm> = async (data) => {
        const file = data.image?.[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            dispatch(setUncontrolledImage(base64String));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
        dispatch(submitUncontrolled(data));
        const isValid = await formSchema.isValid(data);

        if (isValid) {
            navigate('/');
        }
    };

    return (
        <div className={styles['form_wrapper']}>
            <h2>Uncontrolled form</h2>
            <Form
                register={register}
                handleSubmit={handleSubmit(submit)}
                errors={errors}
            />
            <div className={styles['button_back']}>
                <Link to="/ ">Back to main</Link>
            </div>
        </div>
    );
};

export default UncontrolledForm;
