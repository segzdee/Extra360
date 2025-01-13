const express = require('express');
const app = express();
const authRoutes = require('./routes/auth'); 
const clientRoutes = require('./routes/clients'); 
// ... require other routes ...

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/clients', clientRoutes);
// ... use other routes ...

// Error handling middleware (example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
