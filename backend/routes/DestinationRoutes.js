const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/DestinationController');

// Destination routes
router.post('/destinations', destinationController.createDestination); 
router.get('/destinations', destinationController.getAllDestinations); 
router.get('/destinations/:destinationID', destinationController.getDestinationDetail); 

// PATCH route to update destination fee or description
router.patch('/destinations/:destinationID', destinationController.updateDestinationFee); 

module.exports = router;
