// src/components/OAuth.js
import React from 'react';
import { Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

const OAuth = () => {
    const handleGitHubLogin = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/github";
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/google";
    };

    return (
        <Box mt={3}>
            <Box mt={2}>
                <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    onClick={handleGitHubLogin}
                    fullWidth
                    sx={{
                        backgroundColor: '#e3f2fd', // Light blue shade
                        color: '#000',
                        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', // Shadow effect
                        '&:hover': {
                            backgroundColor: '#bbdefb', // Slightly darker blue on hover
                        },
                        marginBottom: '10px',
                    }}
                >
                    Login with GitHub
                </Button>
                <Button
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                    fullWidth
                    sx={{
                        backgroundColor: '#e3f2fd', // Light blue shade
                        color: '#000',
                        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', // Shadow effect
                        '&:hover': {
                            backgroundColor: '#bbdefb', // Slightly darker blue on hover
                        },
                    }}
                >
                    Login with Google
                </Button>
            </Box>
        </Box>
    );
};

export default OAuth;