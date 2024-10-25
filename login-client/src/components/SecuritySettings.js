import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  CardContent,
  Switch,
  Typography
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Alert from "@mui/lab/Alert";
import StyledCard from "./StyledCard";
import StyledHr from "./StyledHr";
import { sendVerificationEmail, updateMfa, deleteUser, logoutController } from "../controllers/authController";
import DeleteProfileCard from "./DeleteProfileCard";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
  },
  subtitle: {
    color: theme.palette.secondary.main,
  },
  body: {
    color: "#696969",
  },
  button: {
    marginTop: "10px",
  },
  verifiedText: {
    color: theme.palette.success.main,
  },
  disabledText: {
    color: theme.palette.error.main,
  },
  icon: {
    marginLeft: "5px",
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  centerBox: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const SecuritySettings = ({ emailVerified, mfaEnabled, email }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isChanged, setIsChanged] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [isVerifyEmailDisabled, setIsVerifyEmailDisabled] = useState(false);
  const [isMfaEnabled, setIsMfaEnabled] = useState(mfaEnabled === "TRUE");
  const [initialMfaEnabled] = useState(mfaEnabled === "TRUE"); // Track the initial state of MFA
  const [enteredEmail, setEnteredEmail] = useState('');

  useEffect(() => {
    // Check if there's a change in the MFA status compared to the initial value
    if (isMfaEnabled !== initialMfaEnabled) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [isMfaEnabled, initialMfaEnabled]);


  const handleInteraction = () => {
    setIsChanged(true);
  };

  const handleEmailChange = (event) => {
    setEnteredEmail(event.target.value);
  };

  const handleVerifyEmail = async () => {
    setIsVerifyEmailDisabled(true);
    try {
      const response = await sendVerificationEmail(email);
      setAlertMessage(response.data);
      setAlertSeverity("success");
    } catch (error) {
      setAlertMessage(error.message || "Failed to send verification email");
      setAlertSeverity("error");
    }
    setTimeout(() => {
      setIsVerifyEmailDisabled(false);
    }, 10000); // Re-enable the button after 10 seconds
  };

  const handleUpdateProfile = async () => {
    const mfaStatus = isMfaEnabled ? 'TRUE' : 'FALSE';
    const result = await updateMfa(email, mfaStatus);
    if (result.success) {
      console.log('MFA status updated successfully');
      setAlertMessage("Profile updated successfully.");
      setAlertSeverity("success");
      setTimeout(() => {
        navigate("/profile"); // Navigate to the profile page
      }, 2000); // Redirect after 2 seconds
    } else {
      console.error(`Error updating MFA status: ${result.message}`);
      setAlertMessage("Failed to update profile. Please try again.");
      setAlertSeverity("error");
    }
  };

  const handleMfaChange = (event) => {
    setIsMfaEnabled(event.target.checked);
    handleInteraction();
  };

  const handleDeleteProfile = async () => {
    deleteUser(email);
    console.log('Delete profile clicked');
    await logoutController();
  };

  return (
    <>
    <StyledCard>
      <CardContent>
        <Box mb={3}>
          <Typography variant="h6" className={classes.title}>
            Security Settings
          </Typography>
        </Box>
        {alertMessage && (
          <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
            {alertMessage}
          </Alert>
        )}
        <Box mt={3} mb={3}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Verify Email
          </Typography>
          <Typography variant="body2" className={classes.body}>
            Unlock security features for this account by verifying your email.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={emailVerified || isVerifyEmailDisabled}
            onClick={handleVerifyEmail}
          >
            Verify Email
          </Button>
          {emailVerified && (
            <Typography className={classes.verifiedText}>
              Verified <CheckCircleIcon className={classes.icon} />
            </Typography>
          )}
        </Box>
        <StyledHr />
        <Box mt={3} mb={3}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Enable MFA
          </Typography>
          <Typography variant="body2" className={classes.body}>
            Enable MFA in your profile for step-up authentications.
          </Typography>
          {mfaEnabled === "DISABLED" ? (
            <Typography className={classes.disabledText}>
              MFA not available for social logins
            </Typography>
          ) : (
            <>
              <Typography component="div" style={{ marginTop: "10px" }}>
                Enable MFA
                <Switch
                  color="primary"
                  checked={isMfaEnabled}
                  onChange={handleMfaChange}
                  disabled={!emailVerified}
                />
              </Typography>
              {!emailVerified && (
                <Typography className={classes.disabledText}>
                  Verify email to enable MFA
                </Typography>
              )}
              {isMfaEnabled && emailVerified && (
                <Typography className={classes.verifiedText}>
                  MFA Enabled <CheckCircleIcon className={classes.icon} />
                </Typography>
              )}
            </>
          )}
        </Box>
        <StyledHr />
        <Box mt={3}>
          <Button
            variant="contained"
            color="secondary"
            disabled={!isChanged}
            onClick={handleUpdateProfile}
          >
            Update Profile
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
    <StyledCard>
        <CardContent>
          <Box>
          <DeleteProfileCard
            classes={classes}
            enteredEmail={enteredEmail}
            email={email}
            handleEmailChange={handleEmailChange}
            handleDeleteProfile={handleDeleteProfile}
          />
          </Box>
        </CardContent>
      </StyledCard>
      </>
  );
};

export default SecuritySettings;
