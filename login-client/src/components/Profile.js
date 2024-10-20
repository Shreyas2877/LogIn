// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { fetchProfileController } from '../controllers/authController';
import { useNavigate } from 'react-router-dom';

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

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            const result = await fetchProfileController();
            if (result.success) {
                setProfile(result.data);
            } else {
                setError(result.message || 'Failed to fetch profile');
                if (result.statusCode === 401) {
                    navigate('/login'); // Redirect to login page
                }
            }
        };
        getProfile();
    }, [navigate]);

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                {error ? (
                    <Alert severity="error">{error}</Alert>
                ) : profile ? (
                    <>
                        <WelcomeText variant="h6">
                            Welcome, {profile.email}!
                        </WelcomeText>
                        <Alert severity="success" sx={{ mt: 2 }}>
                            Login successful.
                        </Alert>
                    </>
                ) : (
                    <WelcomeText variant="h6">
                        Loading...
                    </WelcomeText>
                )}
            </Box>
        </Container>
    );
};

export default Profile;