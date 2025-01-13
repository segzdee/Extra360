const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { validateRegistration, validateLogin } = require('../middleware/validation'); // Assuming you have a validation middleware

router.post('/register', validateRegistration, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

module.exports = router;
