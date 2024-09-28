import axios from 'axios';

const API_URL = 'http://localhost:5000/api/insurance';

// Upload insurance document and get OCR data
export const uploadInsurance = (formData, token) => {
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Get insurance details
export const getInsuranceDetails = (token) => {
  return axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update insurance details
export const updateInsuranceDetails = (data, token) => {
  return axios.put(`${API_URL}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};