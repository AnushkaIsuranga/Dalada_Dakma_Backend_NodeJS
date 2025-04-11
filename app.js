const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/index'));

// Database connection and server start
// Database connection and server start
const dbConnect = async () => {
  try {
    // Enable logging to see the SQL queries
    sequelize.options.logging = console.log;
    
    // Force recreate tables
    await sequelize.sync({ force: true });
    console.log('Database connected and tables created');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database sync error:', err);
  }
};

dbConnect();

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