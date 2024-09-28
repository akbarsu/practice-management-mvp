import React, { useEffect, useState, useContext } from 'react';
import { AdminContext } from '../state/adminContext';
import { AuthContext } from '../state/authContext';
import { getAllUsers, updateUserRole } from '../services/adminService';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

const ManageUsers = () => {
  const { users, setUsers } = useContext(AdminContext);
  const { getToken } = useContext(AuthContext);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        const response = await getAllUsers(token);
        setUsers(response.data.users || response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [getToken, setUsers]);

  const handleEditRole = (userId, currentRole) => {
    setEditingUserId(userId);
    setSelectedRole(currentRole);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSaveRole = async (userId) => {
    try {
      const token = getToken();
      await updateUserRole(userId, selectedRole, token);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: selectedRole } : user
        )
      );
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <Paper>
      <Typography variant="h5" gutterBottom>
        Manage Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>
                {editingUserId === user._id ? (
                  <FormControl>
                    <InputLabel>Role</InputLabel>
                    <Select value={selectedRole} onChange={handleRoleChange}>
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  user.role
                )}
              </TableCell>
              <TableCell>
                {editingUserId === user._id ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveRole(user._id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleEditRole(user._id, user.role)}
                  >
                    Edit Role
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ManageUsers;