const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

// Route to create a new user
router.post('/create-user/:adminID.', adminController.createUser);

// Route to delete a user
router.delete('/delete-user/:adminID/:userID', adminController.deleteUser);

module.exports = router;
