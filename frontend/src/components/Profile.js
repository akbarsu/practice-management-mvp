import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, makeStyles } from '@material-ui/core';
import { useAuth } from '../state/authContext';
import { getUserProfile, updateUserProfile } from '../services/userService';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { getToken } = useAuth();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // ... other profile fields ...
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        const response = await getUserProfile(token);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [getToken]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await updateUserProfile(profile, token);
      // Show success message or Snackbar
    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error message or Snackbar
    }
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          required
          className={classes.field}
          value={profile.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          required
          className={classes.field}
          value={profile.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          required
          className={classes.field}
          value={profile.email}
          onChange={handleChange}
          disabled
        />
        {/* Add other profile fields as needed */}
        <Button type="submit" color="primary" variant="contained">
          Save Changes
        </Button>
      </form>
    </Paper>
  );
};

export default Profile;