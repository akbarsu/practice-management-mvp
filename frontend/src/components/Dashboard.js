import React from 'react';
import { Typography, Grid, Paper, makeStyles } from '@material-ui/core';
import AppointmentList from './AppointmentList';
import InvoiceList from './InvoiceList';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Upcoming Appointments
            </Typography>
            <AppointmentList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Invoices
            </Typography>
            <InvoiceList />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;