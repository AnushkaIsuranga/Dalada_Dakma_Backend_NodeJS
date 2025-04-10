const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Initialize Sequelize connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Import and initialize models
const AdminUser = require('./AdminUser')(sequelize);
const Category = require('./Category')(sequelize);
const Notice = require('./Notice')(sequelize);
const Notification = require('./Notification')(sequelize);
const Subscriber = require('./Subscriber')(sequelize);

// Create models object for associations
const models = {
  AdminUser,
  Category,
  Notice,
  Notification,
  Subscriber
};

// Set up model associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit if we can't connect to DB
  }
};

// Export models and sequelize instance
module.exports = {
  sequelize,
  ...models,
  testConnection
};