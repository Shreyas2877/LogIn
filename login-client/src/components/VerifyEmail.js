import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, CardContent, Container } from '@mui/material';
import StyledCard from './StyledCard';
import { verifyEmail } from '../controllers/authController'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Validating your email...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (!token) {
      navigate('/login');
      return;
    }});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      verifyEmail(token)
        .then(response => {
          if (response.success) {
            setMessage('Email successfully verified. You can now close this page.');
          } else {
            setMessage('Validation error. Please try later.');
          }
        })
        .catch(error => {
          console.error('Error validating token:', error);
          setMessage('Validation error. Please try later.');
        });
    } else {
      setMessage('Invalid libk or the link has expired. Please try later.');
    }
  }, [location]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <StyledCard
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          py: 4,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#3f51b5', // Primary color
            }}
          >
            Verification
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '16px',
              color: '#555555', // Darker text color for readability
            }}
          >
            {message}
          </Typography>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default VerifyEmail;
