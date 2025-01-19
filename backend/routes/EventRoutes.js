const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');

// Add a new event
router.post('/event', EventController.addEvent);

// Get all events
router.get('/event', EventController.getAllEvents);

// Get event details by eventId
router.get('/event/:eventId', EventController.getEventDetail);

// Update event content
router.put('/event/:eventId', EventController.updateEventContent); 

// Filter events by category
router.get('/category/:category', EventController.filterEventByCategory);

module.exports = router;
