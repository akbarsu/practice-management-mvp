import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../state/adminContext';
import { AuthContext } from '../state/authContext';
import { generateAppointmentReport } from '../services/adminService';
import {
  Typography,
  Paper,
} from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const { reports, setReports } = useContext(AdminContext);
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = getToken();
        const response = await generateAppointmentReport(token);
        // Format data for charting library
        const formattedData = response.data.map((item) => ({
          date: item._id,
          count: item.count,
        }));
        setReports(formattedData);
      } catch (error) {
        console.error('Error generating report:', error);
      }
    };
    fetchReport();
  }, [getToken, setReports]);

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        Appointment Reports
      </Typography>
      {reports.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={reports}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" name="Appointments" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography>No report data available.</Typography>
      )}
    </Paper>
  );
};

export default Reports;