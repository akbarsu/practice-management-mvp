// Displays outstanding and paid invoices
import React, { useEffect, useContext } from 'react';
import { InvoiceContext } from '../state/invoiceContext';
import { useAuth } from '../state/authContext';
import { getInvoices } from '../services/invoiceService';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // ...styles here...
}));

const InvoiceList = () => {
  const classes = useStyles();
  const { invoices, setInvoices } = useContext(InvoiceContext);
  const { getToken } = useAuth();

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
    // Implement payment functionality or redirect to payment page
  };

  return (
    <div>
      {invoices.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Amount Due</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv._id}>
                <TableCell>{new Date(inv.invoiceDate).toLocaleDateString()}</TableCell>
                <TableCell>${inv.amountDue.toFixed(2)}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell>
                  {inv.status === 'unpaid' && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePay(inv._id)}
                    >
                      Pay Now
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No invoices found.</Typography>
      )}
    </div>
  );
};

export default InvoiceList;