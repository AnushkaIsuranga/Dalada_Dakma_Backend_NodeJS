const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize,  AdminUser, Category, Notice, Notification, Subscriber } = require('./models');
require('dotenv').config();

const app = express();

// Middleware
// Enhanced CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://info.sridaladamaligawa.lk'], // Add all allowed origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Routes
app.use('/api', require('./routes/index'));

// In app.js
const startServer = async () => {
  try {
    // Enable logging to see SQL queries
    sequelize.options.logging = console.log;
    
    console.log("Starting database sync...");
    await sequelize.sync();
    console.log("Sync complete");
    
    // Double-check what tables exist
    const [tables] = await sequelize.query('SHOW TABLES');
    console.log('Tables after sync:', tables);
    
    // Start server only after successful sync
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server startup error:', err);
  }
};

startServer();

sequelize.query('SHOW TABLES').then(([results]) => {
  console.log('Current tables:', results);
}).catch(err => {
  console.error('Query error:', err);
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});