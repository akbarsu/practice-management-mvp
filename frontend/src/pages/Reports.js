import React, { useEffect, useState, useContext } from 'react';
import { AdminContext } from '../state/adminContext';
import { useAuth } from '../state/authContext';
import { generateAppointmentReport } from '../services/adminService';
import {
  Typography,
  Paper,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  chartContainer: {
    width: '100%',
    height: 400,
  },
}));

const Reports = () => {
  const classes = useStyles();
  const { reports, setReports } = useContext(AdminContext);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = getToken();
        const response = await generateAppointmentReport(token);
        setReports(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setLoading(false);
      }
    };

    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={classes.container}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Appointment Reports
      </Typography>
      {reports && reports.length > 0 ? (
        <Paper>
          <div className={classes.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reports}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="appointmentCount"
                  name="Appointments"
                  stroke="#3f51b5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      ) : (
        <Typography>No report data available.</Typography>
      )}
    </div>
  );
};

export default Reports;