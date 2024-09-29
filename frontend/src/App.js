import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './state/authContext';
import { AppointmentProvider } from './state/appointmentContext';
import { InvoiceProvider } from './state/invoiceContext';
import { InsuranceProvider } from './state/insuranceContext';
import { AdminProvider } from './state/adminContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import UploadInsurance from './components/UploadInsurance';
import AppointmentList from './components/AppointmentList';
import RequestAppointment from './components/RequestAppointment';
import InvoiceList from './components/InvoiceList';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <InvoiceProvider>
          <InsuranceProvider>
            <AdminProvider>
              <Router>
                <Navbar />
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/upload-insurance" component={UploadInsurance} />
                  <PrivateRoute path="/appointments" component={AppointmentList} />
                  <PrivateRoute path="/request-appointment" component={RequestAppointment} />
                  <PrivateRoute path="/invoices" component={InvoiceList} />
                  <PrivateRoute path="/admin" component={AdminDashboard} roles={['admin']} />
                </Switch>
              </Router>
            </AdminProvider>
          </InsuranceProvider>
        </InvoiceProvider>
      </AppointmentProvider>
    </AuthProvider>
  );
};

export default App;