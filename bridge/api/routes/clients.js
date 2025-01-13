const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const authenticateToken = require('../middleware/auth');

// Create a new shift
router.post('/shifts', authenticateToken, ClientController.createShift);

// Get all shifts for the client
router.get('/shifts', authenticateToken, ClientController.getShifts);

// ... other client-related routes ...

module.exports = router;
