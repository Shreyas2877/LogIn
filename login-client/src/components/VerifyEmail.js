import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, CardContent, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StyledCard from './StyledCard';
import { verifyEmail } from '../controllers/authController'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
  body: {
    color: '#696969',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const VerifyEmail = () => {
  const classes = useStyles();
  const location = useLocation();
  const [message, setMessage] = useState('Validating your email...');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if JWT token is present in cookies
    const token = Cookies.get("jwt");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    console.log('Navigated to verify-email page');

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
      setMessage('Invalid token. Please try later.');
    }
  }, [location]);

  return (
    <Container>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            {message}
          </Typography>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default VerifyEmail;