const express = require('express');
const router = express.Router();
const AgencyController = require('../controllers/AgencyController');
const authenticateToken = require('../middleware/auth');

// Get agency staff
router.get('/staff', authenticateToken, AgencyController.getAgencyStaff);

// Add staff to agency
router.post('/staff', authenticateToken, AgencyController.addStaffToAgency);

// ... other agency-related routes ...

module.exports = router;
