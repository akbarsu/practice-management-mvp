const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const Invoice = require('../models/invoiceModel');
const logger = require('../config/logger');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    logger.error(`Get Users Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation Error: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, role } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      user.role = role;
      await user.save();
      logger.info(`User role updated: ${user.email}, New Role: ${role}`);
      res.json({ message: 'User role updated', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    logger.error(`Update User Role Error: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await User.countDocuments({ roles: 'patient' });
    const totalAppointments = await Appointment.countDocuments();
    const totalInvoices = await Invoice.countDocuments();
    const unpaidInvoices = await Invoice.countDocuments({ status: 'unpaid' });

    res.status(200).json({
      totalPatients,
      totalAppointments,
      totalInvoices,
      unpaidInvoices,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard statistics', error });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ roles: 'patient' });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
};

// Update patient profile
exports.updatePatient = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'firstName lastName email')
      .exec();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment status', error });
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('userId', 'firstName lastName email')
      .exec();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoices', error });
  }
};

// Update invoice status
exports.updateInvoiceStatus = async (req, res) => {
  try {
    const { invoiceId, status } = req.body;
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error updating invoice status', error });
  }
};

// Generate appointment report
exports.generateAppointmentReport = async (req, res) => {
  try {
    // Example: Count appointments per day for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const reportData = await Appointment.aggregate([
      {
        $match: { appointmentDate: { $gte: sevenDaysAgo } },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$appointmentDate' },
          },
          appointmentCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format data for frontend consumption
    const formattedData = reportData.map((item) => ({
      date: item._id,
      appointmentCount: item.appointmentCount,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  // ... other exports ...
};