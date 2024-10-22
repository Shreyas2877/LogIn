// src/components/Deregister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box, TextField, Alert } from '@mui/material';
import { deregisterController } from '../controllers/authController';

const Deregister = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDeregister = async () => {
        setError(''); // Clear previous error before new deregister attempt
        try {
            const result = await deregisterController(email);
            if (result.success) {
                navigate('/', { state: { message: 'User de-registered successfully.' } });
            } else {
                setError(result.message || "Deregistration Failed!");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Deregister
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button variant="contained" color="secondary" onClick={handleDeregister}>
                    Deregister
                </Button>
            </Box>
        </Container>
    );
};

export default Deregister;