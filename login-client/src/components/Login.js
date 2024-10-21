// src/components/Login.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginController } from '../controllers/authController';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import OAuth from './OAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (location.state && location.state.message) {
            setSuccessMessage(location.state.message);
        }
    }, [location.state]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const result = await loginController(email, password);
        if (result.success) {
            setIsAuthenticated(true);
            navigate('/profile', { replace: true }); // Redirect to profile page and replace history
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
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
                <OAuth />
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
        </Container>
    );
};

export default Login;