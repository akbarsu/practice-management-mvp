import React, { useEffect, useContext, useState } from 'react';
import { Typography, Grid, Paper, makeStyles, CircularProgress } from '@material-ui/core';
import { AppointmentContext } from '../state/appointmentContext';
import { InvoiceContext } from '../state/invoiceContext';
import { AuthContext } from '../state/authContext';
import { getAppointments } from '../services/appointmentService';
import { getInvoices } from '../services/invoiceService';
import AppointmentList from './AppointmentList';
import InvoiceList from './InvoiceList';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const { invoices, setInvoices } = useContext(InvoiceContext);
  const { getToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = getToken();
        const [appointmentsRes, invoicesRes] = await Promise.all([
          getAppointments(token),
          getInvoices(token),
        ]);

        setAppointments(appointmentsRes.data);
        setInvoices(invoicesRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.section}>
            <Typography variant="h5" gutterBottom>
              Upcoming Appointments
            </Typography>
            {appointments.length > 0 ? (
              <AppointmentList appointments={appointments} limit={5} />
            ) : (
              <Typography>No upcoming appointments.</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.section}>
            <Typography variant="h5" gutterBottom>
              Recent Invoices
            </Typography>
            {invoices.length > 0 ? (
              <InvoiceList invoices={invoices} limit={5} />
            ) : (
              <Typography>No recent invoices.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;