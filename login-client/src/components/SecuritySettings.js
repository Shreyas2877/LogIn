import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, CardContent, Switch, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StyledCard from './StyledCard';
import StyledHr from './StyledHr';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
  },
  subtitle: {
    color: theme.palette.secondary.main,
  },
  body: {
    color: '#696969',
  },
  button: {
    marginTop: '10px',
  },
  verifiedText: {
    color: 'green',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    marginLeft: '10px',
  },
  icon: {
    marginLeft: '5px',
  },
  disabledText: {
    color: 'grey',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    marginLeft: '10px',
  },
}));

const SecuritySettings = ({ emailVerified, mfaEnabled }) => {
  const classes = useStyles();
  const [isChanged, setIsChanged] = useState(false);

  const handleInteraction = () => {
    setIsChanged(true);
  };

  return (
    <StyledCard>
      <CardContent>
        <Box mb={3}>
          <Typography variant="h6" className={classes.title}>Security Settings</Typography>
        </Box>
        <Box mt={3} mb={3}>
          <Typography variant="subtitle1" className={classes.subtitle}>Verify Email</Typography>
          <Typography variant="body2" className={classes.body}>
            Unlock security features for this account by verifying your email.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            disabled={emailVerified === "TRUE"}
            onClick={handleInteraction}
          >
            Verify Email
          </Button>
          {emailVerified === "TRUE" && (
            <Typography className={classes.verifiedText}>
              Verified <CheckCircleIcon className={classes.icon} />
            </Typography>
          )}
        </Box>
        <StyledHr />
        <Box mt={3} mb={3}>
          <Typography variant="subtitle1" className={classes.subtitle}>Enable MFA</Typography>
          <Typography variant="body2" className={classes.body}>
            MFA for your profile for step-up authentication.
          </Typography>
          {mfaEnabled === "DISABLED" ? (
            <Typography className={classes.disabledText}>
              MFA not available for social logins
            </Typography>
          ) : (
            <>
              <Typography component="div" style={{ marginTop: '10px' }}>
                Enable MFA
                <Switch 
                  color="primary" 
                  checked={mfaEnabled === "TRUE"} 
                  onChange={handleInteraction}
                />
              </Typography>
              {mfaEnabled === "TRUE" && (
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
          >
            Update Profile
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default SecuritySettings;