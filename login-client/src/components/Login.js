// src/components/Login.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginController, sendEmailController } from '../controllers/authController';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { LoginContext } from '../context/LoginContext';
import OAuth from './OAuth';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { setHasLoggedIn } = useContext(LoginContext);

    useEffect(() => {
        // Check if JWT token is present in cookies
        const token = Cookies.get('jwt');
        if (token) {
            navigate('/profile');
        }
    }, [navigate]);

    useEffect(() => {
        if (location.state && location.state.message) {
            setSuccessMessage(location.state.message);
        }
    }, [location.state]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        const result = await loginController(email, password);
        if (result.success) {
            setHasLoggedIn(true);

            // Call the sendEmail method from AuthController
            try {
                await sendEmailController(email);
            } catch (error) {
                console.error('Failed to send OTP email:', error);
            }

            // Redirect to OTP page regardless of the email sending result
            navigate('/otp', { state: { email } }, { replace: true });
        } else {
            setError(result.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
                <OAuth />
            </Box>
        </Container>
    );
};

export default Login;