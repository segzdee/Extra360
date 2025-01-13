const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  async registerUser(firstName, lastName, email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });
    return user; 
  }

  async loginUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
      return token;
    } 
    throw new Error('Invalid credentials'); 
  }
}

module.exports = new AuthService();
