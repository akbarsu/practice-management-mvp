import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';
import { AuthProvider } from '../state/authContext';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders login form and submits successfully', () => {
  const { getByLabelText, getByText } = render(
    <AuthProvider>
      <Router>
        <Login />
      </Router>
    </AuthProvider>
  );

  const emailInput = getByLabelText(/email/i);
  const passwordInput = getByLabelText(/password/i);
  const submitButton = getByText(/login/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  // Assert that the login function is called
});