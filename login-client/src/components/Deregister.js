// src/components/Deregister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deregisterController } from '../controllers/authController';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const Deregister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await deregisterController(email, password);
        if (result.success) {
            navigate('/home');
        } else {
            setError(result.message || "Deregister Failed!");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Deregister
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Deregister
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Deregister;