const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize,  AdminUser, Category, Notice, Notification, Subscriber } = require('./models');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/index'));

// In app.js
const startServer = async () => {
  try {
    // Enable logging to see SQL queries
    sequelize.options.logging = console.log;
    
    console.log("Starting database sync...");
    await sequelize.sync({ force: true });
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