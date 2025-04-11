const {Notice} = require('../models');
const {Category} = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.findAll({
      include: [{
        model: Category,
        as: 'category',
        attributes: ['displayName']
      }],
      order: [['createdDate', 'DESC']]
    });

    const formattedNotices = notices.map(notice => ({
      id: notice.id,
      title: notice.title,
      content: notice.content,
      formattedDate: moment(notice.createdDate).format('MMMM DD, YYYY - h:mm A'),
      categoryId: notice.categoryId,
      categoryName: notice.category.displayName
    }));

    res.json(formattedNotices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNoticesByCategory = async (req, res) => {
  try {
    const notices = await Notice.findAll({
      where: { categoryId: req.params.categoryId },
      include: [{
        model: Category,
        as: 'category',
        attributes: ['displayName']
      }],
      order: [['createdDate', 'DESC']]
    });

    const formattedNotices = notices.map(notice => ({
      id: notice.id,
      title: notice.title,
      content: notice.content,
      formattedDate: moment(notice.createdDate).format('MMMM DD, YYYY - h:mm A'),
      categoryId: notice.categoryId,
      categoryName: notice.category.displayName
    }));

    res.json(formattedNotices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNotice = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    
    const notice = await Notice.create({
      title,
      content,
      categoryId,
      createdDate: new Date()
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    const { title, content, categoryId } = req.body;
    notice.title = title;
    notice.content = content;
    notice.categoryId = categoryId;
    await notice.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await notice.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};