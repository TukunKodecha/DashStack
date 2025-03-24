import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email required")
        .test(
            "is-valid-email",
            "Must be a valid Email",
            (value) => {
                if (!value) return false;

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                return (
                    emailPattern.test(value)
                );
            }
        ),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});