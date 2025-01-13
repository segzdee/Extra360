const express = require('express');
const router = express.Router();
const ShiftController = require('../controllers/ShiftController');
const authenticateToken = require('../middleware/auth');
const { validateShiftCreation } = require('../middleware/validation');

router.post('/', authenticateToken, validateShiftCreation, ShiftController.createShift);
router.get('/', authenticateToken, ShiftController.getShifts);
// ... other shift-related routes ...

module.exports = router;
