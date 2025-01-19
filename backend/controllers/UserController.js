const UserModel = require('../models/User'); 

class User {
  // Create a new user profile
  static async createProfile(req, res) {
    try {
      // Create a new user based on the request body
      const user = new UserModel({
        userID: req.body.userID,
        userName: req.body.userName,
        picture: req.body.picture,
      });

      // Save the new user to the database
      await user.save();
      res.status(201).json(user); // Return the newly created user
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      // Find user by userID (number) instead of _id (ObjectId)
      const user = await UserModel.findOne({ userID: parseInt(req.params.userID) });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.userName = req.body.userName;
      user.picture = req.body.picture;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  

}

module.exports = User;
