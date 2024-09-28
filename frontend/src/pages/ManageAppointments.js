import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../state/adminContext';
import { AuthContext } from '../state/authContext';
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
} from '@material-ui/core';

const ManageAppointments = () => {
  const { appointments, setAppointments } = useContext(AdminContext);
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = getToken();
        const response = await getAllAppointments(token);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [getToken, setAppointments]);

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

  return (
    <Paper>
      <Typography variant="h5" gutterBottom>
        Manage Appointments
      </Typography>
      <Table>
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
    </Paper>
  );
};

export default ManageAppointments;