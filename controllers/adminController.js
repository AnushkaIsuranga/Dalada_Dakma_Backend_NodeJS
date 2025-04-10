const { AdminUser } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Using findOne with password selection
    const admin = await AdminUser.findOne({
      where: { username },
      attributes: ['id', 'username', 'password'] // Must include password to compare
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token without password
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return admin data without password
    const adminData = admin.get({ plain: true });
    delete adminData.password;

    res.json({ 
      success: true,
      token,
      admin: adminData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Registration attempt for username: ${username}`);

        // Check if username exists
        const existingAdmin = await AdminUser.findOne({ where: { username } });
        if (existingAdmin) {
            console.log("Username already exists");
            return res.status(400).json({ 
                success: false,
                message: 'Username already exists' 
            });
        }

        // Create new admin (password is hashed automatically via model hook)
        const admin = await AdminUser.create({ username, password });
        console.log("Admin created successfully");

        res.status(201).json({
            success: true,
            admin: {
                id: admin.id,
                username: admin.username
            }
        });
    } catch (error) {
        console.error("Admin registration error:", error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};