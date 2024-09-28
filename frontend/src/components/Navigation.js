import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/authContext';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  linkButton: {
    color: '#fff',
    textDecoration: 'none',
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const { authState, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          My Health App
        </Typography>
        <Button component={Link} to="/" className={classes.linkButton}>
          Home
        </Button>
        {authState.isAuthenticated && (
          <>
            <Button component={Link} to="/appointments" className={classes.linkButton}>
              Appointments
            </Button>
            <Button component={Link} to="/invoices" className={classes.linkButton}>
              Invoices
            </Button>
            <Button component={Link} to="/profile" className={classes.linkButton}>
              Profile
            </Button>
            {authState.user.role === 'admin' && (
              <Button component={Link} to="/admin" className={classes.linkButton}>
                Admin Panel
              </Button>
            )}
            <Button onClick={logout} className={classes.linkButton}>
              Logout
            </Button>
          </>
        )}
        {!authState.isAuthenticated && (
          <>
            <Button component={Link} to="/login" className={classes.linkButton}>
              Login
            </Button>
            <Button component={Link} to="/register" className={classes.linkButton}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;