// Displays a list of upcoming and past appointments
import React, { useEffect, useContext } from 'react';
import { AppointmentContext } from '../state/appointmentContext';
import { useAuth } from '../state/authContext';
import { getAppointments, cancelAppointment } from '../services/appointmentService';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // ...styles here...
}));

const AppointmentList = () => {
  const classes = useStyles();
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = getToken();
        const response = await getAppointments(token);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [getToken, setAppointments]);

  const handleCancel = async (appointmentId) => {
    try {
      const token = getToken();
      await cancelAppointment(appointmentId, token);
      setAppointments((prev) => prev.filter((appt) => appt._id !== appointmentId));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div>
      {appointments.length > 0 ? (
        <List>
          {appointments.map((appt) => (
            <ListItem key={appt._id}>
              <ListItemText
                primary={`Appointment on ${new Date(appt.appointmentDate).toLocaleString()}`}
                secondary={`Status: ${appt.status}`}
              />
              {appt.status === 'scheduled' && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCancel(appt._id)}
                >
                  Cancel
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No appointments found.</Typography>
      )}
    </div>
  );
};

export default AppointmentList;