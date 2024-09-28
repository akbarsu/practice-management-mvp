import React, { useState } from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { uploadInsurance } from '../services/insuranceService';
import { useAuth } from '../state/authContext';

const useStyles = makeStyles((theme) => ({
  // Define styles here
}));

const UploadInsurance = () => {
  const classes = useStyles();
  const { getToken } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      // Show error message
      return;
    }
    const formData = new FormData();
    formData.append('insuranceFile', selectedFile);
    try {
      const token = getToken();
      const response = await uploadInsurance(formData, token);
      // Handle success, e.g., update state or show success message
    } catch (error) {
      console.error('Error uploading insurance document:', error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div>
      <Typography variant="h5">Upload Insurance Document</Typography>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default UploadInsurance;