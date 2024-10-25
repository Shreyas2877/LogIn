import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, Alert, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendResetPasswordEmail } from "../controllers/authController";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timer, setTimer] = useState(0); // Timer state
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const result = await sendResetPasswordEmail(email);
      if (result.success) {
        setSuccessMessage("Password reset email has been sent successfully.");
        setTimer(30); // Set 30-second timer after sending the email
      } else {
        setError("Failed to send password reset email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="#3f51b5"
          fontWeight="bold"
        >
          Forgot Password?
        </Typography>
        <Typography
          variant="subtitle1"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          Enter your email to receive password reset instructions.
        </Typography>
      </Box>
      <Box>
        <Card elevation={10} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", p: 3 }}>
          <form onSubmit={handleForgotPassword}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                borderRadius: "8px",
                bgcolor: "#f5f5f5",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#3f51b5",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3f51b5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            />
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={timer > 0} // Disable button if timer is running
              sx={{
                mt: 2,
                borderRadius: "8px",
                bgcolor: timer > 0 ? "grey.500" : "#3f51b5", // Adjust color based on timer
                padding: "10px",
                "&:hover": {
                  bgcolor: timer > 0 ? "grey.500" : "#303f9f",
                },
              }}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Send Reset Link"}
            </Button>
          </form>
        </Card>
      </Box>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Remember your password? <Button onClick={() => navigate("/login")} color="primary">Log in here</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
