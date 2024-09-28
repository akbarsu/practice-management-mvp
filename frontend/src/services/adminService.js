import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

// Get all users
export const getAllUsers = (token, page = 1, limit = 20) => {
  return axios.get(`${API_URL}/users?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update user role
export const updateUserRole = (userId, role, token) => {
  return axios.put(
    `${API_URL}/users/role`,
    { userId, role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get all appointments
export const getAllAppointments = (token) => {
  return axios.get(`${API_URL}/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update appointment status
export const updateAppointmentStatus = (appointmentId, status, token) => {
  return axios.put(
    `${API_URL}/appointments/status`,
    { appointmentId, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get all invoices
export const getAllInvoices = (token) => {
  return axios.get(`${API_URL}/invoices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update invoice status
export const updateInvoiceStatus = (invoiceId, status, token) => {
  return axios.put(
    `${API_URL}/invoices/status`,
    { invoiceId, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Generate appointment reports
export const generateAppointmentReport = (token) => {
  return axios.get(`${API_URL}/reports/appointments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};