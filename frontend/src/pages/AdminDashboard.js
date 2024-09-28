// Admin panel overview (appointments, invoices, etc.)
import React from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import ManageUsers from './ManageUsers';
import ManageAppointments from './ManageAppointments';
import ManageInvoices from './ManageInvoices';
import Reports from './Reports';
import { Typography, AppBar, Toolbar, makeStyles, Tabs, Tab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
}));

function a11yProps(index) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminDashboard = () => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">Admin Panel</Typography>
        </Toolbar>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Users" component={Link} to={`${url}/users`} {...a11yProps(0)} />
          <Tab label="Appointments" component={Link} to={`${url}/appointments`} {...a11yProps(1)} />
          <Tab label="Invoices" component={Link} to={`${url}/invoices`} {...a11yProps(2)} />
          <Tab label="Reports" component={Link} to={`${url}/reports`} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <div className={classes.content}>
        <Switch>
          <Route exact path={path}>
            <Typography variant="h5">Welcome to the Admin Panel</Typography>
          </Route>
          <Route path={`${path}/users`} component={ManageUsers} />
          <Route path={`${path}/appointments`} component={ManageAppointments} />
          <Route path={`${path}/invoices`} component={ManageInvoices} />
          <Route path={`${path}/reports`} component={Reports} />
        </Switch>
      </div>
    </div>
  );
};

export default AdminDashboard;