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
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }

        if (roles && roles.indexOf(authState.user.role) === -1) {
          // Role not authorized
          return <Redirect to={{ pathname: '/unauthorized' }} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;