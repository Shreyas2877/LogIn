import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  loginController,
  sendEmailController,
} from "../controllers/authController";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
} from "@mui/material";
import { LoginContext } from "../context/LoginContext";
import OAuth from "./OAuth";
import Cookies from "js-cookie";
import { AnimatedAlert } from "./animations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setHasLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    // Check if JWT token is present in cookies
    const token = Cookies.get("jwt");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(false);
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [successMessage]);

  useEffect(() => {
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const result = await loginController(email, password);
    if (result.success) {
      setHasLoggedIn(true);

      // Send OTP email
      

      // Check if JWT token is present in cookies
      const token = Cookies.get("jwt");
      if (token) {
        navigate("/profile");
      } else {
        try {
          await sendEmailController(email);
        } catch (error) {
          console.error("Failed to send OTP email:", error);
          setError("Failed to send OTP email");
          return;
        }
        navigate("/otp", { state: { email } }, { replace: true });
      }
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Box mb={2}>
          <AnimatedAlert severity="success" show={successMessage}>
            {successMessage}
          </AnimatedAlert>
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            New user? <Link href="/signup">Sign up here</Link>
          </Typography>
        </Box>
        <OAuth />
      </Box>
    </Container>
  );
};

export default Login;