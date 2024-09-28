import React from 'react';
import { Typography, Container } from '@material-ui/core';

const Unauthorized = () => {
  return (
    <Container>
      <Typography variant="h4" color="error" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1">
        You do not have permission to view this page.
      </Typography>
    </Container>
  );
};

export default Unauthorized;