// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { fadeInDown, AnimatedAlert } from './animations';

const WelcomeText = styled(Typography)`
  animation: ${fadeInDown} 2s ease-in-out;
`;

const Home = () => {
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (location.state && location.state.message && location.state.fromLogout) {
            setMessage(location.state.message);
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000); // Hide after 5 seconds
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [location.state]);

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Box mb={2}>
                    {showMessage && (
                        <AnimatedAlert severity="success" show={showMessage}>
                            {message}
                        </AnimatedAlert>
                    )}
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <WelcomeText variant="h4">
                        Trojan Auth
                    </WelcomeText>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;