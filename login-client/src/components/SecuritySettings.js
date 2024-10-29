import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  CardContent,
  Switch,
  Typography,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Alert from "@mui/lab/Alert";
import StyledCard from "./StyledCard";
import StyledHr from "./StyledHr";
import {
  sendVerificationEmail,
  updateMfa,
  generateTotpQrCode,
} from "../controllers/authController";
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
  centerBox: {
    display: "flex",
    justifyContent: "center",
  },
  qrCodeOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  qrCodeContainer: {
    backgroundColor: "#fff",
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    textAlign: "center",
  },
  qrCodeImage: {
    width: "200px",
    height: "200px",
  },
}));

const SecuritySettings = ({ emailVerified, mfaEnabled, email, qrCodeEnabled }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isChanged, setIsChanged] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [isVerifyEmailDisabled, setIsVerifyEmailDisabled] = useState(false);
  const [isMfaEnabled, setIsMfaEnabled] = useState(mfaEnabled === "TRUE");
  const [initialMfaEnabled] = useState(mfaEnabled === "TRUE");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);

  useEffect(() => {
    // Check if there's a change in the MFA status compared to the initial value
    if (isMfaEnabled !== initialMfaEnabled) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [isMfaEnabled, initialMfaEnabled]);

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

  const handleMfaChange = (event) => {
    setIsMfaEnabled(event.target.checked);
    setIsChanged(true);
  };

  const handleGenerateQrCode = async () => {
    try {
      const response = await generateTotpQrCode(email);
      setQrCodeUrl(`data:image/png;base64,${response.data}`);
      setShowQrCode(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setAlertMessage("Failed to generate QR code. Please try again.");
      setAlertSeverity("error");
    }
  };

  const handleCloseQrCode = () => setShowQrCode(false);

  const handleUpdateProfile = async () => {
    const mfaStatus = isMfaEnabled ? "TRUE" : "FALSE";
    const result = await updateMfa(email, mfaStatus);
    if (result.success) {
      setAlertMessage("Profile updated successfully.");
      setAlertSeverity("success");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } else {
      setAlertMessage("Failed to update profile. Please try again.");
      setAlertSeverity("error");
    }
  };

  return (
    <>
      <StyledCard>
        <CardContent>
          <Box mb={2}>
            <Typography variant="h6" className={classes.title}>
              Account Settings
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
                  <>
                    <Typography className={classes.verifiedText}>
                      Enabled <CheckCircleIcon className={classes.icon} />
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleGenerateQrCode}
                      disabled={qrCodeEnabled}
                    >
                      Generate TOTP QR Code
                    </Button>
                    {qrCodeEnabled && (
                      <Typography
                        variant="body2"
                        className={classes.disabledText}
                        style={{ marginTop: "10px" }}
                      >
                        The TOTP QR code has already been set up for this account. To request a
                        new QR code, please contact support.
                      </Typography>
                    )}
                  </>
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

      {/* QR Code Overlay */}
      {showQrCode && (
        <div className={classes.qrCodeOverlay} onClick={handleCloseQrCode}>
          <div className={classes.qrCodeContainer} onClick={(e) => e.stopPropagation()}>
            <img src={qrCodeUrl} alt="TOTP QR Code" className={classes.qrCodeImage} />
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Scan this QR code with your authenticator app
            </Typography>
          </div>
        </div>
      )}

      <Card sx={{ backgroundColor: "#333", borderRadius: 2 }}>
        <CardContent>
          <Box>
            <DeleteProfileCard email={email} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SecuritySettings;