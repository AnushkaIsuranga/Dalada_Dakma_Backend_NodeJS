const express = require('express');
const router = express.Router();

// Import controllers
const adminController = require('../controllers/adminController');
const categoriesController = require('../controllers/categoriesController');
const noticesController = require('../controllers/noticesController');
const notificationController = require('../controllers/notificationController');
const subscribersController = require('../controllers/subscribersController');
const locationController = require('../controllers/locationController');

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
router.get('/notices', noticesController.getNotices);
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
router.put('/notifications/:id/toggle', notificationController.toggleNotificationStatus);
router.delete('/notifications/:id', notificationController.deleteNotification);

// Subscriber routes
router.post('/subscribers', subscribersController.createSubscriber);


// Location routes
router.get('/locations', locationController.getLocations);
router.get('/locations/category/:categoryId', locationController.getLocationsByCategory);
router.post('/locations', locationController.createLocation);
router.put('/locations/:id', locationController.updateLocation);
router.delete('/locations/:id', locationController.deleteLocation);

// Special endpoint for lost persons
router.get('/locations/lost-persons', locationController.getLostPersons);
router.post('/locations/lost-persons', locationController.createLostPerson);
router.patch('/locations/lost-persons/:id/status', locationController.updateLostPersonStatus);

module.exports = router;