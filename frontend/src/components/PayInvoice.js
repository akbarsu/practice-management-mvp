import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { payInvoice, getInvoices } from '../services/invoiceService';
import { InvoiceContext } from '../state/invoiceContext';
import { AuthContext } from '../state/authContext';
import {
  Typography,
  Button,
  makeStyles,
  TextField,
  CircularProgress,
  Paper,
  Snackbar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: 400,
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const PayInvoice = () => {
  const classes = useStyles();
  const { invoiceId } = useParams();
  const { invoices, updateInvoice } = useContext(InvoiceContext);
  const { getToken } = useContext(AuthContext);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const existingInvoice = invoices.find((inv) => inv._id === invoiceId);
        if (existingInvoice) {
          setInvoice(existingInvoice);
        } else {
          const token = getToken();
          const response = await getInvoices(token);
          const fetchedInvoice = response.data.find((inv) => inv._id === invoiceId);
          setInvoice(fetchedInvoice);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [invoiceId, invoices, getToken]);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await payInvoice(invoiceId, paymentMethodId, token);
      updateInvoice(response.data.invoice);
      setSnackbarMessage('Payment successful');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Payment Error:', error);
      setSnackbarMessage('Payment failed: ' + error.response.data.message);
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!invoice) {
    return <Typography variant="h6">Invoice not found</Typography>;
  }

  return (
    <Paper className={classes.form}>
      <Typography variant="h4">Pay Invoice</Typography>
      <Typography variant="subtitle1">
        Amount Due: ${invoice.amountDue.toFixed(2)}
      </Typography>
      <form onSubmit={handlePayment}>
        <TextField
          label="Payment Method ID"
          value={paymentMethodId}
          onChange={(e) => setPaymentMethodId(e.target.value)}
          required
          fullWidth
          margin="normal"
          helperText="Use 'pm_card_visa' for testing"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
          fullWidth
        >
          Pay ${invoice.amountDue.toFixed(2)}
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Paper>
  );
};

export default PayInvoice;