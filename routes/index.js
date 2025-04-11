const express = require('express');
const router = express.Router();

console.log('server is running...');
// Import middleware

// Import controllers
const adminController = require('../controllers/adminController');
const categoriesController = require('../controllers/categoriesController');
const noticesController = require('../controllers/noticesController');
const notificationController = require('../controllers/notificationController');
const subscribersController = require('../controllers/subscribersController');

// Admin routes
router.post('/admin/login', adminController.login);
router.post('/admin/register', adminController.register);

// Category routes
router.get('/categories', categoriesController.getAllCategories);
router.get('/categories/:id', categoriesController.getCategoryById);
router.post('/categories', categoriesController.createCategory);
router.put('/categories/:id', categoriesController.updateCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);

// Notice routes
router.get('/notices/category/:categoryId', noticesController.getNoticesByCategory);
router.post('/notices', noticesController.createNotice);
router.put('/notices/:id', noticesController.updateNotice);
router.delete('/notices/:id', noticesController.deleteNotice);

// Notification routes
router.get('/notifications', notificationController.getAllNotifications);
router.get('/notifications/active', notificationController.getActiveNotifications);
router.get('/notifications/:id', notificationController.getNotificationById);
router.post('/notifications', notificationController.createNotification);
router.put('/notifications/:id', notificationController.updateNotification);
router.patch('/notifications/:id/toggle', notificationController.toggleNotificationStatus);
router.delete('/notifications/:id', notificationController.deleteNotification);

// Subscriber routes
router.post('/subscribers', subscribersController.createSubscriber);

module.exports = router;