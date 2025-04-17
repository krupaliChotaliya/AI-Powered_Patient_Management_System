import React, { useState } from 'react';
import { Paper, Typography, Box, Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// Sample appointment data
const initialAppointments = [
  {
    id: 1,
    title: 'Doctor Appointment',
    startDate: '2025-03-29T09:00:00',
    endDate: '2025-03-29T10:00:00',
  },
  {
    id: 2,
    title: 'Dentist Appointment',
    startDate: '2025-03-30T14:00:00',
    endDate: '2025-03-30T15:00:00',
  },
  // Add more appointments as needed
];

function AppointmentScheduler() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    startDate: '',
    endDate: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open the dialog to add a new appointment
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Add a new appointment
  const handleAddAppointment = () => {
    const appointment = {
      id: appointments.length + 1,
      title: newAppointment.title,
      startDate: newAppointment.startDate,
      endDate: newAppointment.endDate,
    };
    setAppointments((prev) => [...prev, appointment]);
    setNewAppointment({ title: '', startDate: '', endDate: '' });
    handleCloseDialog();
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Appointment Scheduler
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ marginBottom: 2 }}>
        Add Appointment
      </Button>
      <Grid container spacing={2}>
        {appointments.map((appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment.id}>
            <Paper elevation={1} sx={{ padding: 2 }}>
              <Typography variant="h6">{appointment.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(appointment.startDate).toLocaleString()} -{' '}
                {new Date(appointment.endDate).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog to add a new appointment */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Appointment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newAppointment.title}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date and Time"
            type="datetime-local"
            fullWidth
            variant="outlined"
            value={newAppointment.startDate}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date and Time"
            type="datetime-local"
            fullWidth
            variant="outlined"
            value={newAppointment.endDate}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddAppointment} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default AppointmentScheduler;
