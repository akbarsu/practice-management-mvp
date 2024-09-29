import React, { useState } from 'react';
import { useAuth } from '../state/authContext';
import { uploadInsurance } from '../services/insuranceService';
import {
  Typography,
  Button,
  TextField,
  Container,
  makeStyles,
  Input,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // ...styles here...
}));

const UploadInsurance = () => {
  const classes = useStyles();
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const [insuranceData, setInsuranceData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('insuranceCard', file);

      const response = await uploadInsurance(formData, token);
      setInsuranceData(response.data);
    } catch (error) {
      console.error('Error uploading insurance:', error);
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Upload Insurance Card
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </Button>
      {insuranceData && (
        <div>
          <Typography variant="h6" gutterBottom>
            Extracted Insurance Information
          </Typography>
          {/* Display extracted insurance data for confirmation */}
        </div>
      )}
    </Container>
  );
};

export default UploadInsurance;