const express = require('express');
const router = express.Router();
const discoverETController = require('../controllers/DiscoverETController');

// DiscoverET routes
router.post('/discoverET', discoverETController.createDiscoverET);
router.get('/discoverET', discoverETController.getAllDiscoverET);
router.get('/discoverET/:placeName', discoverETController.getDiscoverETByPlaceName);

// Add the route for updating a DiscoverET entry
router.patch('/discoverET/:placeName', discoverETController.updateDiscoverET);  // Add this route

module.exports = router;
