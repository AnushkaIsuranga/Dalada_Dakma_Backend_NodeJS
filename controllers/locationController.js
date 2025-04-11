const { Location, Category } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Op } = require('sequelize');
const LOST_FOUND_CATEGORY_ID = 7;

exports.getLocations = async (req, res) => {
    try {
      const locations = await Location.findAll({
        include: [{
          model: Category,
          as: 'category',
          attributes: ['name']
        }]
      });
      
      res.json(locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.getLocationsByCategory = async (req, res) => {
  try {
    const locations = await Location.findAll({
      where: { category_id: req.params.categoryId },
      include: [{
        model: Category,
        as: 'category',
        attributes: ['name']
      }]
    });
    
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const locationData = {
      ...req.body,
      category_id: req.body.category_id
    };

    const location = await Location.create(locationData);
    
    res.status(201).json(location);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    await location.update(req.body);
    res.json(location);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    await location.destroy();
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getLostPersons = async (req, res) => {
    try {
      const lostPersons = await Location.findAll({
        where: { 
          category_id: LOST_FOUND_CATEGORY_ID, // Define this constant
          status: { [Op.not]: null } 
        },
        order: [['last_seen', 'DESC']]
      });
      
      res.json(lostPersons);
    } catch (error) {
      console.error('Error fetching lost persons:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.createLostPerson = async (req, res) => {
    try {
      const lostPerson = await Location.create({
        ...req.body,
        category_id: LOST_FOUND_CATEGORY_ID,
        last_seen: new Date()
      });
      
      res.status(201).json(lostPerson);
    } catch (error) {
      console.error('Error creating lost person:', error);
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.updateLostPersonStatus = async (req, res) => {
    try {
      const { status, found_location } = req.body;
      const lostPerson = await Location.findByPk(req.params.id);
      
      if (!lostPerson) {
        return res.status(404).json({ message: 'Lost person record not found' });
      }
  
      await lostPerson.update({
        status,
        found_location,
        found_time: status === 'Found' ? new Date() : null
      });
      
      res.json(lostPerson);
    } catch (error) {
      console.error('Error updating lost person status:', error);
      res.status(400).json({ message: error.message });
    }
  };