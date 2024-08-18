import * as yup from 'yup';

export const formSchema = yup.object().shape({
    name: yup
        .string()
        .required('field must not be empty')
        .matches(
            /^[A-Z][a-zA-Z]*$/,
            'only latin letters, first letter capital'
        ),

    age: yup
        .number()
        .required('field must not be empty')
        .positive('age must be positive')
        .integer(),

    email: yup
        .string()
        .required('field must not be empty')
        .email('email must be valid'),

    password: yup
        .string()
        .required('field must not be empty')
        .matches(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).+$/,
            'required 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
        ),

    confirmPassword: yup
        .string()
        .required('field must not be empty')
        .oneOf([yup.ref('password')], 'passwords must match'),

    country: yup.string().required('field must not be empty'),

    gender: yup.string().required('field must not be empty'),

    image: yup
        .mixed<FileList>()
        .test('fileType', (value) => {
            if (value) {
                return value.length > 0;
            }
            return false;
        })
        .required('image is required'),

    acceptTerms: yup
        .boolean()
        .required()
        .oneOf([true], 'you must accept the terms'),
});
