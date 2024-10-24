// src/components/Home.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import { fadeInDown, AnimatedAlert } from "./animations";

const WelcomeText = styled(Typography)`
  animation: ${fadeInDown} 2s ease-in-out;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const SubText = styled(Typography)`
  font-family: "Roboto", sans-serif;
  color: #fafafa;
  margin-bottom: 20px;
`;

const FeatureTitle = styled(Typography)`
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #ffffff;
`;

const FeatureDescription = styled(Typography)`
  font-family: "Roboto", sans-serif;
  color: #dddddd;
`;

const AnimatedCard = styled(Card)`
  background-color: #45346e;
  border-radius: 2px;
  box-shadow: 3;
  backdrop-filter: blur(10px);
  color: white;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Home = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (location.state && location.state.message && location.state.fromLogout) {
      setMessage(location.state.message);
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [location.state]);

  return (
    <Container maxWidth="md">
      <Box mt={5} mb={10}>
        {
          <AnimatedAlert show={showMessage} severity="success">
            {message}
          </AnimatedAlert>
        }
        <WelcomeText variant="h3" component="h1" gutterBottom>
          Welcome to TrojAuth
        </WelcomeText>
        <SubText variant="h5" gutterBottom>
          Discover the features and benefits of using our application.
        </SubText>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 4,
            mt: 4,
          }}
        >
          <AnimatedCard>
            <CardContent>
              <FeatureTitle variant="h6" component="h2" gutterBottom>
                Secure Logins with JWT Tokens
              </FeatureTitle>
              <FeatureDescription variant="body1">
                Our application ensures secure logins by utilizing JSON Web
                Tokens (JWT). This method provides a robust and scalable way to
                authenticate users, ensuring that your data remains protected
                and secure. JWT tokens are easy to implement and integrate,
                offering a seamless user experience while maintaining high
                security standards.
              </FeatureDescription>
            </CardContent>
          </AnimatedCard>
          <AnimatedCard>
            <CardContent>
              <FeatureTitle variant="h6" component="h2" gutterBottom>
                OAuth Functionality
              </FeatureTitle>
              <FeatureDescription variant="body1">
                Our application supports OAuth, allowing users to log in using
                their existing accounts from popular platforms such as Google,
                and GitHub. This feature simplifies the login process, enhances
                user convenience, and increases security by leveraging trusted
                third-party authentication providers.
              </FeatureDescription>
            </CardContent>
          </AnimatedCard>
          <AnimatedCard>
            <CardContent>
              <FeatureTitle variant="h6" component="h2" gutterBottom>
                Multi-Factor Authentication (MFA)
              </FeatureTitle>
              <FeatureDescription variant="body1">
                Enhance the security of your application with our Multi-Factor
                Authentication (MFA) feature. Users can authenticate using their
                email, adding an extra layer of security to their accounts. MFA
                helps prevent unauthorized access and ensures that only verified
                users can access sensitive information.
              </FeatureDescription>
            </CardContent>
          </AnimatedCard>
          <AnimatedCard>
            <CardContent>
              <FeatureTitle variant="h6" component="h2" gutterBottom>
                Easy Integration with Any Application
              </FeatureTitle>
              <FeatureDescription variant="body1">
                Our application is designed for easy integration with any
                existing system or application. Whether you are building a new
                project or enhancing an existing one, our solution provides a
                straightforward and efficient way to incorporate advanced
                authentication features. Enjoy the flexibility and ease of use
                that comes with our integration capabilities.
              </FeatureDescription>
            </CardContent>
          </AnimatedCard>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;