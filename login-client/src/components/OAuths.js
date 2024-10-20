import React from 'react';
import { Button, Box } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import GoogleIcon from '@mui/icons-material/Google';
const OAuths = () => {
    const handleGoogleLogin = () => {
        // Add your Google login logic here
    };

    const handleGitHubLogin = () => {
        // Add your GitHub login logic here
    };

    return (
        <Box display="flex" justifyContent="space-between" mb={2}>
            <Button
                variant="contained"
                color="default"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                style={{ marginRight: '10px', backgroundColor: '#4285F4', color: 'white' }}
            >
                Login with Google
            </Button>
            <Button
                variant="contained"
                color="default"
                startIcon={<GitHubIcon />}
                onClick={handleGitHubLogin}
                style={{ backgroundColor: '#333', color: 'white' }}
            >
                Login with GitHub
            </Button>
        </Box>
    );
};

export default OAuths;