import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { validateOtp } from "../controllers/authController";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import Cookies from "js-cookie";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { hasLoggedIn } = useContext(LoginContext);

  const email = location.state?.email;

  useEffect(() => {
    // Check if JWT token is present in cookies
    const token = Cookies.get("jwt");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  useEffect(() => {
    if (!hasLoggedIn) {
      navigate("/login");
    }
  }, [hasLoggedIn, navigate]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("OTP is required");
      return;
    }

    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otp)) {
      setError("OTP must be a 6-digit number");
      return;
    }

    const result = await validateOtp(email, otp);
    if (result.success) {
      navigate("/profile");
    } else {
      setError(result.message || "Invalid or expired OTP");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box mt={5} sx={{ mt: -2 }}>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            py: 4,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent sx={{ textAlign: "center", color: "white" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Verify OTP
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ fontSize: "16px", color: "white" }}
            >
              We have sent a verification code to your registered email address:{" "}
              {email}
            </Typography>
            <form
              onSubmit={handleOtpSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                placeholder={"OTP Goes here..."}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                  maxWidth: "300px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 1,
                }}
                InputProps={{
                  style: { color: "#000" }, // Set the text color to black
                }}
                InputLabelProps={{
                  style: { color: "#000" }, // Set the placeholder color to black
                }}
              />
              {error && (
                <Alert
                  severity="error"
                  sx={{ maxWidth: "300px", width: "100%" }}
                >
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ maxWidth: "300px", mt: 2 }}
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
