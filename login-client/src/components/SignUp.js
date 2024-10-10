import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signupController } from '../controllers/authController';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const { email, password } = values;
        const result = await signupController(email, password);
        setSubmitting(false);
        if (result.success) {
            navigate('/home');
        } else {
            console.log("Sign up failed", result);
            if(result.statusCode === 400){
                setErrors({ general: result.message || "User doesn't exist" });
            }
            else{
                setErrors({ general: "An Unexpected error occurred, Try again!" });
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign-up
                </Typography>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            {errors.general && <Alert severity="error">{errors.general}</Alert>}
                            <Field
                                as={TextField}
                                label="Email"
                                name="email"
                                type="email"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={<ErrorMessage name="email" />}
                                required
                            />
                            <Field
                                as={TextField}
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={<ErrorMessage name="password" />}
                                required
                            />
                            <Box mt={2}>
                                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                                    Sign-up
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default Signup;