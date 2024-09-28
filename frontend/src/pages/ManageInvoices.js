import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../state/adminContext';
import { AuthContext } from '../state/authContext';
import { getAllInvoices, updateInvoiceStatus } from '../services/adminService';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from '@material-ui/core';

const ManageInvoices = () => {
  const { invoices, setInvoices } = useContext(AdminContext);
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = getToken();
        const response = await getAllInvoices(token);
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, [getToken, setInvoices]);

  const handleStatusChange = async (invoiceId, status) => {
    try {
      const token = getToken();
      await updateInvoiceStatus(invoiceId, status, token);
      setInvoices((prevInvoices) =>
        prevInvoices.map((inv) =>
          inv._id === invoiceId ? { ...inv, status } : inv
        )
      );
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  return (
    <Paper>
      <Typography variant="h5" gutterBottom>
        Manage Invoices
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount Due</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Change Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv._id}>
              <TableCell>{`${inv.userId.firstName} ${inv.userId.lastName}`}</TableCell>
              <TableCell>{new Date(inv.invoiceDate).toLocaleDateString()}</TableCell>
              <TableCell>${inv.amountDue.toFixed(2)}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell>
                <Select
                  value={inv.status}
                  onChange={(e) => handleStatusChange(inv._id, e.target.value)}
                >
                  <MenuItem value="unpaid">Unpaid</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="overdue">Overdue</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ManageInvoices;