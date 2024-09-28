import React, { useEffect, useContext, useState } from 'react';
import { AdminContext } from '../state/adminContext';
import { AuthContext } from '../state/authContext';
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
    height: 400,
  },
}));

const Reports = () => {
  const classes = useStyles();
  const { reports, setReports } = useContext(AdminContext);
  const { getToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = getToken();
        const response = await generateAppointmentReport(token);
        const formattedData = response.data.map((item) => ({
          date: item._id,
          count: item.count,
        }));
        setReports(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error generating report:', error);
        setLoading(false);
      }
    };
    fetchReport();
  }, [getToken, setReports]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Appointment Reports
      </Typography>
      {reports.length > 0 ? (
        <div className={classes.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" name="Appointments" stroke="#3f51b5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Typography>No report data available.</Typography>
      )}
    </Paper>
  );
};

export default Reports;