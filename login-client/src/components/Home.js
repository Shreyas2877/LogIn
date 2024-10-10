// src/components/Home.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
    return (
        <Container maxWidth="sm">
            <Box mt={5} textAlign="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    Login App
                </Typography>
                <Box mt={5}>
                    <Typography variant="h6" component="p">
                        Login successful
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;