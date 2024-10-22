import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { LoginContext } from '../context/LoginContext';

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { hasLoggedIn } = useContext(LoginContext);
  const email = location.state?.email || ""; // Get email from location state

  useEffect(() => {
    if (!hasLoggedIn) {
      navigate('/login');
    }
  }, [hasLoggedIn, navigate]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.trim() === "") {
      setError("OTP cannot be empty");
      return;
    }
    // Make call to backend with the OTP. /email-otp
    // If successful go ahead with auth logic.
    // Authentication logic here. 
    navigate('/profile');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Enter OTP
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              gutterBottom
            >
              The OTP has been sent to {email}
            </Typography>
            <form onSubmit={handleOtpSubmit}>
              <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={!!error}
                helperText={error}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default OtpPage;