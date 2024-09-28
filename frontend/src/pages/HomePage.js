import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  makeStyles,
  Grid,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    textAlign: 'center',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <div className={classes.heroContent}>
        <Typography component="h1" variant="h2" gutterBottom>
          Welcome to Healthcare Platform
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Manage your appointments and invoices with ease.
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" component={Link} to="/login">
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" component={Link} to="/register">
                Register
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;