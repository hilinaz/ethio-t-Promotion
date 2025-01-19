    const express = require('express');
const router = express.Router();
const historicalEventController = require('../controllers/HistoricalEventController');

// Historical event routes
router.post('/historical-events', historicalEventController.createHistoricalEvent);
router.get('/historical-events', historicalEventController.getAllHistoricalEvents);
// Historical event routes
router.get('/historical-events/year/:year', historicalEventController.getHistoricalEventByYear);


module.exports = router;
