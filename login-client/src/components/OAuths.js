import React from 'react';
import { Button, Box } from '@material-ui/core';
import { GitHub as GitHubIcon } from '@material-ui/icons';
import GoogleIcon from '@mui/icons-material/Google';
import { oAuthGoogleController, oAuthGithubController } from '../controllers/OAuthControlle';

const OAuths = () => {
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        const result = await oAuthGoogleController();
        if (result.success) {
            window.location.href = result.data.url;
        } else {
            console.log(result.message);
        }
    };

    const handleGitHubLogin = async (e) => {
        e.preventDefault();
        const result = await oAuthGithubController();
        if (result.success) {
            window.location.href = result.data.url;
        } else {
            console.log(result.message);
        }
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