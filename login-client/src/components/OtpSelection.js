import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Container,
} from '@material-ui/core';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { sendEmailController, fetchProfileController } from '../controllers/authController';
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
  icon: {
    fontSize: '3.5rem',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  dividerText: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
  dividerLine: {
    flexGrow: 1,
    height: '1px',
    backgroundColor: theme.palette.divider,
  },
  methodDescription: {
    marginTop: theme.spacing(1),
    fontSize: '0.9rem',
    color: theme.palette.text.secondary,
  },
}));

const OtpSelection = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();
  const classes = useStyles();
  const { email } = location.state || {};
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

  const handleEmailOtp = async () => {
    try {
        await sendEmailController(email);
      } catch (error) {
        console.error("Failed to send OTP email:", error);
        setError("Failed to send OTP email");
        return;
      }
    navigate('/otp', { state: { email } }, { replace: true });
  };

  const handleTotp = () => {
    navigate('/totp', { state: { email } }, { replace: true });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom className={classes.title}>
          Choose Authentication Method
        </Typography>
        <Typography variant="subtitle1" component="h2" className={classes.subtitle}>
          Please select one of the following options to proceed with your login.
        </Typography>
      </Box>
      <Box>
        <Card className={classes.card}>
          <CardContent>
            <Box className={classes.centerBox}>
              <EmailIcon className={classes.icon} />
              <Typography variant="h6" className={classes.title}>
                Email OTP
              </Typography>
              <Typography className={classes.methodDescription}>
                Receive a one-time password via email.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleEmailOtp}
                fullWidth
              >
                Select Email OTP
              </Button>
            </Box>
            <Box className={classes.dividerText}>
              <Divider className={classes.dividerLine} />
              <Typography variant="body2" sx={{ mx: 2 }}>
                or
              </Typography>
              <Divider className={classes.dividerLine} />
            </Box>
            <Box className={classes.centerBox}>
              <PhoneAndroidIcon className={classes.icon} />
              <Typography variant="h6" className={classes.title}>
                Authenticator OTP
              </Typography>
              <Typography className={classes.methodDescription}>
                Use a time-based one-time password from an authenticator app on your device.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleTotp}
                fullWidth
              >
                Select TOTP
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default OtpSelection;
