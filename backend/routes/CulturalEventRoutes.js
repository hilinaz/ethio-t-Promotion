const express = require('express');
const router = express.Router();
const culturalEventController = require('../controllers/CulturalEventController');

// Cultural event routes
router.post('/cultural-events', culturalEventController.createCulturalEvent);
router.get('/cultural-events', culturalEventController.getAllCulturalEvents);
router.get('/cultural-events/:eventID', culturalEventController.getCulturalEventById);
router.post('/cultural-events', culturalEventController.filterCulturalEventsByDate); 

module.exports = router;
