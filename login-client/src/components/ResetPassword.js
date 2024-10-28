import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert, Card } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutController, resetPasswordController } from "../controllers/authController";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      try {
        const decodedEmail = atob(token); 
        setEmail(decodedEmail); 
      } catch (err) {
        console.error("Failed to decode token:", err);
        setError("Invalid or expired token. Please request a new reset link.");
        navigate("/login"); // Redirect to login if token is invalid
      }
    } else {
      setError("The verification link is invalid");
      navigate("/login"); // Redirect to login if no token is provided
    }
  }, [location, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (!email) {
        setError("The reset link not valid or expired");
        return;
      }

      const result = await resetPasswordController(email, newPassword);
      if (result?.success) {
        setSuccessMessage("Password reset successfully. Redirecting to login...");
        await logoutController();
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
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
          Reset Your Password
        </Typography>
        <Typography
          variant="subtitle1"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          Create a new password to secure your account.
        </Typography>
      </Box>
      <Box>
        <Card elevation={10} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", p: 3 }}>
          <form onSubmit={handleResetPassword}>
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              sx={{
                mt: 2,
                borderRadius: "8px",
                bgcolor: "#3f51b5",
                padding: "10px",
                "&:hover": {
                  bgcolor: "#303f9f",
                },
              }}
            >
              Reset Password
            </Button>
          </form>
        </Card>
      </Box>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Already have an account? <Button onClick={() => navigate("/login")} color="primary">Log in here</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default ResetPassword;
