import { AuthService } from '@services/auth';
import { User, UserRole } from '@models';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  // Existing test cases remain the same
});
