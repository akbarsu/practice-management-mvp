import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../state/authContext';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { authState } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!authState.isAuthenticated) {
          // Not logged in, redirect to login page
          return <Redirect to="/login" />;
        }

        if (roles && roles.indexOf(authState.user.role) === -1) {
          // Role not authorized
          return <Redirect to="/dashboard" />;
        }

        // Authorized, render the component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;