import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/authContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // ...styles here...
}));

const Navbar = () => {
  const classes = useStyles();
  const { authState, logout } = useAuth();
  const isAuthenticated = authState.isAuthenticated;
  const userRole = authState.user?.role;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Healthcare Platform
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            {userRole === 'admin' && (
              <Button color="inherit" component={Link} to="/admin">
                Admin Panel
              </Button>
            )}
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;