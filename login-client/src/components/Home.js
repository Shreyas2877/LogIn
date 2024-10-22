import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const fadeInDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOutUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const AnimatedAlert = styled(Alert)`
  animation: ${({ show }) => (show ? fadeInDown : fadeOutUp)} 1s forwards;
`;

const WelcomeText = styled(Typography)`
  animation: ${fadeInDown} 2s ease-in-out;
`;

const Home = () => {
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (location.state && location.state.message) {
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
                    <AnimatedAlert severity="success" show={showMessage}>
                        {message}
                    </AnimatedAlert>
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