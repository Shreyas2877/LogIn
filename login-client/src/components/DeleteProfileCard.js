import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { Alert } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from 'react-router-dom';

const DeleteProfileCard = ({ classes, enteredEmail, email, handleEmailChange, handleDeleteProfile }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    setError("");
    setSuccessMessage("");

    try {
      await handleDeleteProfile(); // Call the function to delete the profile
      setSuccessMessage("Account deleted successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      console.error("Failed to delete account:", err);
      setError("Failed to delete account. Please try again.");
    }
  };

  return (
    <Box mt={4} mb={4}>
      <Typography variant="h6" className={classes.subtitle}>
        Delete Profile
      </Typography>
      <Typography variant="body2" className={classes.body}>
        Deleting your profile will delete all the data relating to this account with us. To proceed with the deletion, please enter your email address to confirm.
      </Typography>
      <Box mt={4} mb={4}>
        <TextField
          placeholder={email}
          variant="outlined"
          fullWidth
          value={enteredEmail}
          onChange={handleEmailChange}
          InputProps={{
            style: { height: '50px' }
          }}
          InputLabelProps={{
            shrink: false
          }}
        />
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <Box mt={4} mb={4}>
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
