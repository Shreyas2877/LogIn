import React from 'react';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: '20px 0',
  },
});

const StyledHr = () => {
  const classes = useStyles();
  return <Divider className={classes.root} />;
};

export default StyledHr;