const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/FeedbackController');

// Feedback routes
router.post('/feedback', feedbackController.submitFeedback);
router.put('/feedback/:feedbackID', feedbackController.updateFeedback);

module.exports = router;
