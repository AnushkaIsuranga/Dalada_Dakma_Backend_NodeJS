const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();


const app = express();
const db = require('./models');
const sequelize = db.sequelize;
// Basic CORS configuration for your React frontend
const corsOptions = {
  origin: 'http://localhost:5173', // Specify your frontend origin exactly
  methods: 'GET,POST,PUT,DELETE',
  credentials: true // Allow credentials (cookies, auth headers)
};
app.use(cors(corsOptions)); // Enable CORS with options
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API routes
app.use('/api', require('./routes/index'));

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Endpoint not found' 
  });
});

// Central error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  
  // Determine status code
  const statusCode = err.statusCode || 500;
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Database connection and server start
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    
    // Sync models with the database
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database models synchronized');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Server startup error:', err);
    process.exit(1); // Exit if database connection fails
  });