const bcrypt = require('bcrypt');
const AdminModel = require('../models/Admin');
const User = require('../models/User'); // Import the User model

const saltRounds = 10; // Define the number of rounds for hashing

class Admin {
  // Create a new user
  static async createUser(req, res) {
    try {
      // Check if the admin exists by adminID and has the correct role
      const admin = await AdminModel.findOne({ adminID: req.params.adminID });
      if (!admin || admin.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      // Create a new user using the User model with the hashed password
      const newUser = new User({
        userID: req.body.userID,
        userName: req.body.userName,
        picture: req.body.picture,
        password: hashedPassword, // Store the hashed password
      });

      await newUser.save(); // Save the new user to the database

      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a user
  static async deleteUser(req, res) {
    try {
      // Check if the admin exists by adminID and has the correct role
      const admin = await AdminModel.findOne({ adminID: req.params.adminID });
      if (!admin || admin.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }

      // Find and delete the user by custom userID field
      const user = await User.findOneAndDelete({ userID: req.params.userID });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = Admin;
