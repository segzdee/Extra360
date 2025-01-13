import express from 'express';
import { AuthService } from './services/auth/AuthService';
import { ShiftService } from './services/shift/ShiftService';
import { ConfigManager } from './config/configManager';

const app = express();
const configManager = ConfigManager.getInstance();
const PORT = configManager.get('port') || 3000;

// Middleware
app.use(express.json());

// Services
const authService = new AuthService();
const shiftService = new ShiftService();

// Authentication Routes
app.post('/auth/register', async (req, res) => {
  try {
    const user = await authService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const token = await authService.authenticate(
      req.body.email, 
      req.body.password
    );
    
    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Shift Routes
app.post('/shifts', async (req, res) => {
  try {
    const shift = await shiftService.create(req.body);
    res.status(201).json(shift);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    services: ['auth', 'shifts'] 
  });
});

app.listen(PORT, () => {
  console.log(`Microservices running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: err.message 
  });
});
