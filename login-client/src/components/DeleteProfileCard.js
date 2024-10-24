import React from 'react';
import { Box, Typography, TextField, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteProfileCard = ({ classes, enteredEmail, email, handleEmailChange, handleDeleteProfile }) => {
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
      <Box mt={4} mb={4}>
        <Button
          variant="contained"
          color="default"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteProfile}
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