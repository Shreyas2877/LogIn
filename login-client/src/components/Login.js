import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  loginController,
  sendEmailController,
  fetchProfileController,
} from "../controllers/authController";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Card,
  Divider,
} from "@mui/material";
import { LoginContext } from "../context/LoginContext";
import OAuth from "./OAuth";
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
    const getProfile = async () => {
      const result = await fetchProfileController();
      if (result.success) {
        navigate('/profile');
      }
    };

    getProfile();
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
    if (location.state?.message) {
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
      if (result.data && result.data.mfaEnabled === "TRUE") {
        try {
          await sendEmailController(email);
        } catch (error) {
          console.error("Failed to send OTP email:", error);
          setError("Failed to send OTP email");
          return;
        }
        navigate("/otp", { state: { email } }, { replace: true });
      } else {
        navigate("/profile");
      }
    } else {
      setError("Login failed");
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
          Welcome Back to TrojApp!
        </Typography>
        <Typography
          variant="subtitle1"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          Please log in to continue.
        </Typography>
      </Box>
      <Box>
        <Card elevation={10} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", p: 3 }}>
          <Box mb={2}>
            <AnimatedAlert severity="success" show={successMessage}>
              {successMessage}
            </AnimatedAlert>
          </Box>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
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
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Login
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              <Link href="/forgot-password" color="#3f51b5">
                Forgot Password?
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              New user? <Link href="/signup" color="#3f51b5">Sign up here</Link>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" my={2}>
              <Divider sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="textSecondary" sx={{ mx: 2 }}>
                or
              </Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Box>
          <OAuth />
        </Card>
      </Box>
    </Container>
  );
};

export default Login;