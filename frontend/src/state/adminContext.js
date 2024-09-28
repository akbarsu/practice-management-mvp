import React, { createContext, useState, useContext } from 'react';

export const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [reports, setReports] = useState([]);

  return (
    <AdminContext.Provider
      value={{
        users,
        setUsers,
        appointments,
        setAppointments,
        invoices,
        setInvoices,
        reports,
        setReports,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};