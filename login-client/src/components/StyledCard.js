import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    margin: '20px 0',
    backgroundColor: '#e0e0e0', // Darker shade
    borderRadius: '8px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow
  },
});

const StyledCard = ({ children }) => {
  const classes = useStyles();
  return <Card className={classes.root}>{children}</Card>;
};

export default StyledCard;