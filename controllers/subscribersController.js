const {Subscriber} = require('../models');

exports.createSubscriber = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      return res.status(400).json({ message: 'Name and PhoneNumber are required' });
    }

    const subscriber = await Subscriber.create({
      name,
      phoneNumber,
      subscriptionDate: new Date()
    });

    res.status(201).json(subscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};