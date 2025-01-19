const express = require('express');
const router = express.Router();
const blogManagerController = require('../controllers/BlogManagerController');

// Create a Blog Manager
router.post('/create', blogManagerController.createBlogManager);

// Report a blog
router.post('/:managerID/report', blogManagerController.reportBlog);

// Review reported blogs
router.get('/:managerID/review', blogManagerController.reviewReportedBlogs);

// Delete a blog from the reported list
router.delete('/:managerID/delete', blogManagerController.deleteBlog);

module.exports = router;
