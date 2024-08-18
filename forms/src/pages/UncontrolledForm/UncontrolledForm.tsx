import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setUncontrolledImage, submitUncontrolled } from '../../store/slices/formDataSlice.ts';

const UncontrolledForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'male',
        termsAccepted: false,
        country: 'USA',
        picture: null as File | null,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFormData(prevState => ({
            ...prevState,
            picture: file
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const { name, age, email, password, confirmPassword, gender, termsAccepted, country, picture } = formData;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const formDataToSubmit = { name, age: Number(age), email, password, gender, termsAccepted, country };

        if (picture) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                dispatch(setUncontrolledImage(base64String));
            };
            reader.readAsDataURL(picture);
        }

        dispatch(submitUncontrolled(formDataToSubmit));

        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                name="age"
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange}
            />
            <select
                name="country"
                value={formData.country}
                onChange={handleChange}
            >
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                {/* Добавьте другие страны */}
            </select>
            <input
                name="picture"
                type="file"
                onChange={handleFileChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UncontrolledForm;
