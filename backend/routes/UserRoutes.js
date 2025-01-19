const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// User routes
router.post('/users/profile', userController.createProfile); 
router.put('/users/:userID/profile', userController.updateProfile);


module.exports = router;
