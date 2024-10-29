import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { Alert } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { deleteUser, logoutController } from '../controllers/authController';

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: theme.palette.secondary.main,
  },
  body: {
    color: '#696969',
  },
  button: {
    marginTop: '10px',
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const DeleteProfileCard = ({ email }) => {
  const classes = useStyles();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEnteredEmail(event.target.value);
  };

  const handleDeleteProfile = async () => {
    try {
      await deleteUser(email);
      await logoutController();
    } catch (error) {
      throw new Error('Failed to delete account');
    }
  };

  const handleDelete = async () => {
    setError('');
    setSuccessMessage('');

    try {
      await handleDeleteProfile();
      setSuccessMessage('Account deleted successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error('Failed to delete account:', err);
      setError('Failed to delete account. Please try again.');
    }
  };

  return (
    <Box mt={2} mb={2}>
      <Typography variant="h6" className={classes.subtitle} sx={{ color: '#fff' }}>
        Delete Profile
      </Typography>
      <Typography variant="body2" className={classes.body} sx={{ color: '#ccc' }}>
        Deleting your profile will delete all the data relating to this account with us. To proceed with the deletion, please enter your email address to confirm.
      </Typography>
      <Box mt={2} mb={2}>
        <TextField
          placeholder={email}
          variant="outlined"
          fullWidth
          value={enteredEmail}
          onChange={handleEmailChange}
          InputProps={{
            style: { height: '50px', backgroundColor: '#555', color: '#fff' },
          }}
          InputLabelProps={{
            shrink: false,
          }}
        />
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <Box mt={2} mb={2}>
        <Button
          variant="contained"
          color="default"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          className={`${classes.button} ${classes.deleteButton}`}
          disabled={enteredEmail !== email}
        >
          Delete Your Profile
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteProfileCard;