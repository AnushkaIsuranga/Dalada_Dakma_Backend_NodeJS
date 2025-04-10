const {Notification} = require('../models');
const { Op } = require('sequelize');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { isActive: true },
      order: [['createdDate', 'DESC']]
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getActiveNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { isActive: true },
      order: [['createdDate', 'DESC']],
      limit: 5
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { content, isActive } = req.body;
    const notification = await Notification.create({
      content,
      isActive: isActive !== false,
      createdDate: new Date()
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    const { content, isActive } = req.body;
    notification.content = content;
    notification.isActive = isActive;
    await notification.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleNotificationStatus = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isActive = !notification.isActive;
    await notification.save();

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};