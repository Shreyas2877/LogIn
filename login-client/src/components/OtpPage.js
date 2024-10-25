import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { validateOtp, sendEmailController, fetchProfileController } from "../controllers/authController"; // Make sure resendOtp is implemented in authController
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Link,
} from "@mui/material";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30); // Timer state
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Resend link state
  const navigate = useNavigate();
  const location = useLocation();
  const { hasLoggedIn } = useContext(LoginContext);

  const email = location.state?.email;

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

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

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

  const handleResendOtp = async () => {
    setTimer(30);
    setIsResendDisabled(true);
    setError("");

    // Call the resendOtp function to send a new OTP
    try {
          await sendEmailController(email);
        } catch (error) {
          console.error("Failed to send OTP email:", error);
          setError("Failed to send OTP email");
          return;
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
      <Box mt={5}>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            py: 4,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#3f51b5",
              }}
            >
              Verify OTP
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                fontSize: "16px",
                color: "#555555",
              }}
            >
              We have sent a verification code to your registered email address:{" "}
              <strong>{email}</strong>
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
                placeholder="Enter OTP..."
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
                  style: { color: "#000" },
                }}
                InputLabelProps={{
                  style: { color: "#000" },
                }}
              />
              {error && (
                <Alert
                  severity="error"
                  sx={{ maxWidth: "300px", width: "100%", mt: 1 }}
                >
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  maxWidth: "300px",
                  mt: 2,
                  borderRadius: "8px",
                  bgcolor: "#3f51b5",
                  "&:hover": {
                    bgcolor: "#303f9f",
                  },
                }}
              >
                Submit
              </Button>
            </form>
            <Typography
              variant="body2"
              sx={{ mt: 2, color: "#3f51b5", fontWeight: "bold" }}
            >
              {isResendDisabled ? (
                `Resend OTP in ${timer}s`
              ) : (
                <Link href="#" onClick={handleResendOtp}>
                  Resend OTP
                </Link>
              )}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default OtpPage;
