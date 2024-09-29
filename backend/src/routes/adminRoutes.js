const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all admin routes
router.use(authMiddleware.authenticateToken);
router.use(authMiddleware.authorizeRoles('admin'));

// Dashboard Statistics
router.get('/dashboard', adminController.getDashboardStats);

// Patient Management
router.get('/patients', adminController.getAllPatients);
router.put('/patients/:userId', adminController.updatePatient);
router.delete('/patients/:userId', adminController.deletePatient);

// Appointment Management
router.get('/appointments', adminController.getAllAppointments);
router.put('/appointments/status', adminController.updateAppointmentStatus);

// Invoice Management
router.get('/invoices', adminController.getAllInvoices);
router.put('/invoices/status', adminController.updateInvoiceStatus);

// Reporting
router.get('/reports/appointments', adminController.generateAppointmentReport);

module.exports = router;