const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Apply authentication and admin middleware to all admin routes
router.use(authMiddleware);
router.use(adminMiddleware);

// User Management
router.get('/users', adminController.getAllUsers);

router.put(
  '/users/role',
  [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('role')
      .isIn(['user', 'admin'])
      .withMessage('Role must be either "user" or "admin"'),
  ],
  adminController.updateUserRole
);

// Appointment Management
router.get('/appointments', adminController.getAllAppointments);

router.put(
  '/appointments/status',
  [
    body('appointmentId').isMongoId().withMessage('Invalid appointment ID'),
    body('status')
      .isIn(['scheduled', 'completed', 'cancelled'])
      .withMessage('Invalid status value'),
  ],
  adminController.updateAppointmentStatus
);

// Invoice Management
router.get('/invoices', adminController.getAllInvoices);

router.put(
  '/invoices/status',
  [
    body('invoiceId').isMongoId().withMessage('Invalid invoice ID'),
    body('status')
      .isIn(['paid', 'unpaid', 'overdue'])
      .withMessage('Invalid status value'),
  ],
  adminController.updateInvoiceStatus
);

// Reports
router.get('/reports/appointments', adminController.generateReport);

module.exports = router;