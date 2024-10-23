import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, CardContent, Switch, Typography } from '@material-ui/core';
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
}));

const SecuritySettings = () => {
  const classes = useStyles();

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
          <Button variant="contained" color="primary" className={classes.button}>
            Verify Email
          </Button>
        </Box>
        <StyledHr />
        <Box mt={3} mb={3}>
          <Typography variant="subtitle1" className={classes.subtitle}>Enable MFA</Typography>
          <Typography variant="body2" className={classes.body}>
            MFA for your profile for step-up authentication.
          </Typography>
          <Typography component="div" style={{ marginTop: '10px' }}>
            Enable MFA
            <Switch color="primary" />
          </Typography>
        </Box>
        <StyledHr />
        <Box mt={3}>
          <Button variant="contained" color="secondary">Update Profile</Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default SecuritySettings;