const express = require('express');
const router = express.Router();
const newsEmailController = require('../controllers/NewsEmailController');

// NewsEmail routes
router.post('/news-email', newsEmailController.createNewsletter); // Create a newsletter
router.get('/news-email', newsEmailController.getAllNewsEmails); // Get all newsletters
router.get('/news-email/:NewsID', newsEmailController.getNewsEmailById); // Get a specific newsletter
router.post('/news-email/:NewsID/send', newsEmailController.sendNewsletter); // Send a newsletter to an email

module.exports = router;
