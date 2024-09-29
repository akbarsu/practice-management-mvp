import React, { useState } from 'react';
import { useAuth } from '../state/authContext';
import { useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  // ...styles here...
}));

const Login = () => {
  const classes = useStyles();
  const { login } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      history.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* ...UI elements... */}
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          // ...props...
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          // ...props...
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          // ...props...
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;