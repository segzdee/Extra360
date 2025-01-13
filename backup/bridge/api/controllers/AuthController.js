const AuthService = require('../services/AuthService');

class AuthController {
  async register(req, res, next) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      const user = await AuthService.registerUser(firstName, lastName, email, password, role);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      next(error); 
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.loginUser(email, password);
      res.json({ message: 'Login successful', token });
    } catch (error) {
      next(error); 
    }
  }
}

module.exports = new AuthController();
