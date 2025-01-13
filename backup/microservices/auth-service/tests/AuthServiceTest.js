const { expect } = require('chai');
const AuthService = require('../src/services/AuthService');

describe('AuthService', () => {
  let authService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('login', () => {
    it('should authenticate valid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      const result = await authService.login(credentials);
      expect(result).to.have.property('token');
      expect(result.success).to.be.true;
    });

    it('should reject invalid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      try {
        await authService.login(credentials);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.equal('Invalid credentials');
      }
    });
  });
});
