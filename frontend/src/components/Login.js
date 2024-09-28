import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Paper, makeStyles } from '@material-ui/core';
import { useAuth } from '../state/authContext';
import { loginUser } from '../services/authService';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: theme.spacing(4),
    marginTop: theme.spacing(8),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
}));

const Login = ({ history }) => {
  const classes = useStyles();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      login(response.data.user, response.data.token);
      history.push('/');
    } catch (error) {
      console.error('Login Error:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          className={classes.field}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          className={classes.field}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" color="primary" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;