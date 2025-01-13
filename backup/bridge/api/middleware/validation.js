const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['client', 'staff', 'agency']).withMessage('Invalid role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateShiftCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('latitude').isFloat().withMessage('Invalid latitude format'),
  body('longitude').isFloat().withMessage('Invalid longitude format'),
  body('start_time').isISO8601().withMessage('Invalid start time format'),
  body('end_time').isISO8601().withMessage('Invalid end time format'),
  body('hourly_rate').isFloat().withMessage('Invalid hourly rate format'),
  // ... add more validation rules for other fields ...
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// ... add more validation middleware for other API endpoints ...

module.exports = { 
  validateRegistration, 
  validateLogin,
  validateShiftCreation
  // ... export other validation middleware ...
};
