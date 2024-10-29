// src/components/Profile.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { fetchProfileController } from "../controllers/authController";
import { useNavigate } from "react-router-dom";
import { fadeInBackground, AnimatedAlert, fadeInDown } from "./animations";
import SecuritySettings from "./SecuritySettings";

const WelcomeText = styled(Typography)`
  animation: ${fadeInDown} 2s ease-in-out;
`;

const StyledCard = styled(Card)`
  margin-top: 20px;
  padding: 20px;
  animation: ${fadeInBackground} 2s ease-in-out;
  background-color: #0d165c; // Dark shade of blue
  border-radius: 16px; // Rounded edges
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 3D shadow effect
  color: white; // Text color for better contrast
`;

const AnimatedSecuritySettings = styled(SecuritySettings)`
  animation: ${fadeInBackground} 2s ease-in-out;
`;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const result = await fetchProfileController();
      if (result.success) {
        setProfile(result.data);
      } else {
        setError(result.message || "Failed to fetch profile");
        if (result.statusCode === 401) {
          navigate("/login"); // Redirect to login page
        }
      }
    };
    getProfile();
  }, [navigate]);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [showSuccessMessage]);

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Box mb={2}>
          <AnimatedAlert severity="success" show={showSuccessMessage}>
            Login successful.
          </AnimatedAlert>
        </Box>
        {(() => {
          if (error) {
            return (
              <AnimatedAlert severity="error" show={true}>
                {error}
              </AnimatedAlert>
            );
          } else if (profile) {
            return (
              <>
                <WelcomeText variant="h6">Welcome, {profile.user}</WelcomeText>
                <StyledCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        {profile.user.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="h5" component="div">
                        {profile.user}
                      </Typography>
                    </Box>
                    <Typography variant="body2">Email: {profile.email}</Typography>
                  </CardContent>
                </StyledCard>
                <AnimatedSecuritySettings 
                  emailVerified={profile.emailVerified} 
                  mfaEnabled={profile.mfaEnabled} 
                  email={profile.email}
                  qrCodeEnabled={profile.qrCodeEnabled}
                /> 
              </>
            );
          } else {
            return <WelcomeText variant="h6">Loading...</WelcomeText>;
          }
        })()}
      </Box>
    </Container>
  );
};

export default Profile;