// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const WelcomeText = styled(Typography)`
  animation: ${fadeIn} 2s ease-in-out;
`;

const Home = () => {
    const location = useLocation();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message);
        }
    }, [location.state]);

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                {message && <Alert severity="success">{message}</Alert>}
                <WelcomeText variant="h4" component="h1" gutterBottom>
                    Welcome to Login Application!
                </WelcomeText>
            </Box>
        </Container>
    );
};

export default Home;