import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './state/authContext';
import { UserProvider } from './state/userContext';
import { InsuranceProvider } from './state/insuranceContext';
import { AppointmentProvider } from './state/appointmentContext';
import { InvoiceProvider } from './state/invoiceContext';
import { AdminProvider } from './state/adminContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
  typography: {
    // Customize typography if needed
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <InsuranceProvider>
          <AppointmentProvider>
            <InvoiceProvider>
              <AdminProvider>
                <Router>
                  <ThemeProvider theme={theme}>
                    <App />
                  </ThemeProvider>
                </Router>
              </AdminProvider>
            </InvoiceProvider>
          </AppointmentProvider>
        </InsuranceProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);