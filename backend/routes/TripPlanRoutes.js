const express = require('express');
const router = express.Router();
const tripPlanController = require('../controllers/TripPlanController');

// Trip plan routes
router.post('/trip-plans', tripPlanController.createTripPlan);
router.get('/trip-plans', tripPlanController.getAllTripPlans);
router.get('/trip-plans/:planID', tripPlanController.getTripPlanById);
router.put('/trip-plans/:planID', tripPlanController.editTripPlan);
router.delete('/trip-plans/:planID', tripPlanController.deleteTripPlan);

// route for downloading a trip plan
router.get('/trip-plans/:planID/download', tripPlanController.downloadTripPlan);

module.exports = router;
