// Displays outstanding and paid invoices
import React, { useEffect, useContext } from 'react';
import { getInvoices } from '../services/invoiceService';
import { InvoiceContext } from '../state/invoiceContext';
import { AuthContext } from '../state/authContext';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  makeStyles,
  Paper,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  invoiceItem: {
    marginBottom: theme.spacing(2),
  },
  payButton: {
    marginLeft: theme.spacing(2),
  },
}));

const InvoiceList = () => {
  const classes = useStyles();
  const { invoices, setInvoices } = useContext(InvoiceContext);
  const { getToken } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = getToken();
        const response = await getInvoices(token);
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, [getToken, setInvoices]);

  const handlePay = (invoiceId) => {
    history.push(`/invoices/${invoiceId}/pay`);
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h4" gutterBottom>
        My Invoices
      </Typography>
      {invoices.length === 0 ? (
        <Typography>No invoices found.</Typography>
      ) : (
        <List>
          {invoices.map((invoice) => (
            <Paper key={invoice._id} className={classes.invoiceItem}>
              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={8}>
                    <ListItemText
                      primary={`Invoice Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`}
                      secondary={`Amount Due: $${invoice.amountDue.toFixed(2)} - Status: ${invoice.status}`}
                    />
                  </Grid>
                  <Grid item xs={4} container justifyContent="flex-end">
                    {invoice.status === 'unpaid' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handlePay(invoice._id)}
                        className={classes.payButton}
                      >
                        Pay Now
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default InvoiceList;