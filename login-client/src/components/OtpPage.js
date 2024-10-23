// src/components/OtpPage.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { validateOtp } from '../controllers/authController';
import { LoginContext } from '../context/LoginContext';

const OtpPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { hasLoggedIn} = useContext(LoginContext);

    const email = location.state?.email;

    useEffect(() => {
      if (!hasLoggedIn) {
          navigate('/login');
      }
  }, [hasLoggedIn, navigate]);

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!otp) {
            setError('OTP is required');
            return;
        }

        const result = await validateOtp(email, otp);
        if (result.success) {
            navigate('/profile');
        } else {
            setError(result.message || 'Invalid or expired OTP');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Enter OTP
                </Typography>
                <form onSubmit={handleOtpSubmit}>
                    <TextField
                        label="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default OtpPage;