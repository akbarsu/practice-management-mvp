const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Apply authentication and admin middleware to all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

// User Management
router.get('/users', adminController.getAllUsers);
router.put('/users/role', adminController.updateUserRole);

// Appointment Management
router.get('/appointments', adminController.getAllAppointments);
router.put('/appointments/status', adminController.updateAppointmentStatus);

// Invoice Management
router.get('/invoices', adminController.getAllInvoices);
router.put('/invoices/status', adminController.updateInvoiceStatus);

// Reports
router.get('/reports/appointments', adminController.generateReport);

module.exports = router;