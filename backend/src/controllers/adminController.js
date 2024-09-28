const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const Invoice = require('../models/invoiceModel');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.json(users);
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      user.role = role;
      await user.save();
      res.json({ message: 'User role updated', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update User Role Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ... other admin controllers for appointments, invoices, reports ...

module.exports = {
  getAllUsers,
  updateUserRole,
  // ... export other controller functions ...
};