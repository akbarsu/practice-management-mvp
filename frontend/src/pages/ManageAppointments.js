import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../state/adminContext';
import { useAuth } from '../state/authContext';
import { getAllAppointments, updateAppointmentStatus } from '../services/adminService';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  table: {
    minWidth: 650,
  },
  select: {
    minWidth: 120,
  },
}));

const ManageAppointments = () => {
  const classes = useStyles();
  const { appointments, setAppointments } = useContext(AdminContext);
  const { getToken } = useAuth();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = getToken();
        const response = await getAllAppointments(token);
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (appointmentId, status) => {
    try {
      const token = getToken();
      await updateAppointmentStatus(appointmentId, status, token);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt._id === appointmentId ? { ...appt, status } : appt
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  if (loading) {
    return (
      <div className={classes.container}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Manage Appointments
      </Typography>
      <Paper>
        {appointments.length > 0 ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Change Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt._id}>
                  <TableCell>{`${appt.userId.firstName} ${appt.userId.lastName}`}</TableCell>
                  <TableCell>{new Date(appt.appointmentDate).toLocaleString()}</TableCell>
                  <TableCell>{appt.status}</TableCell>
                  <TableCell>
                    <Select
                      className={classes.select}
                      value={appt.status}
                      onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                    >
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No appointments found.</Typography>
        )}
      </Paper>
    </div>
  );
};

export default ManageAppointments;