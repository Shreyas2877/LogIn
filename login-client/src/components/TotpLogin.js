import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress
} from '@material-ui/core';
import { Alert } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { validateVerificationToken, fetchProfileController } from '../controllers/authController';
import { LoginContext } from "../context/LoginContext";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '2rem',
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: "20px",
    padding: theme.spacing(1.5),
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  centerBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    textAlign: 'center',
    animation: `$fadeIn 1s ease-in-out`,
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  otpInput: {
    width: '2.5rem',
    height: '2.5rem',
    margin: '0 0.5rem',
    fontSize: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    '&:focus': {
      outline: 'none',
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 5px ${theme.palette.primary.light}`,
    },
  },
  resendLink: {
    marginTop: '15px',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  phoneIcon: {
    fontSize: '4rem',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

const TotpLogin = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { hasLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const result = await fetchProfileController();
        if (result.success) {
          navigate("/profile");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    checkProfile();
  }, [navigate]);

  useEffect(() => {
    if (!hasLoggedIn) {
      navigate("/login");
    }
  }, [hasLoggedIn, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setLoading(true);
      const result = await validateVerificationToken(email, otpValue);
      setLoading(false);
      if (result.success) {
        console.log('OTP submitted:', otpValue);
        navigate('/profile');
      } else {
        setError("Invalid Code, please try again");
      }
    } else {
      setError('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <PhoneAndroidIcon className={classes.phoneIcon} />
        <Typography variant="h4" component="h1" className={classes.title}>
          Two-Factor Authentication
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Enter the 6-digit code displayed on your authenticator app to continue.
        </Typography>
      </Box>
      <Box>
        <Card className={classes.card}>
          <CardContent>
            <Box className={classes.centerBox}>
              <Box display="flex" justifyContent="center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    maxLength="1"
                    className={classes.otpInput}
                  />
                ))}
              </Box>
              {error && (
                <Alert severity="error" style={{ marginTop: '15px' }}>
                  {error}
                </Alert>
              )}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Verify OTP'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default TotpLogin;
