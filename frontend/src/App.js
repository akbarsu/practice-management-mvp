import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import UploadInsurance from './components/UploadInsurance';
import AppointmentList from './components/AppointmentList';
import RequestAppointment from './components/RequestAppointment';
import InvoiceList from './components/InvoiceList';
import PayInvoice from './components/PayInvoice';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/upload-insurance" component={UploadInsurance} />
        <PrivateRoute path="/appointments" component={AppointmentList} />
        <PrivateRoute path="/request-appointment" component={RequestAppointment} />
        <PrivateRoute exact path="/invoices" component={InvoiceList} />
        <PrivateRoute path="/invoices/:invoiceId/pay" component={PayInvoice} />
        <PrivateRoute path="/admin" roles={['admin']} component={AdminDashboard} />
        <Route path="/unauthorized" component={Unauthorized} />
        {/* ... other routes ... */}
      </Switch>
    </>
  );
}

export default App;