const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/BlogPostController');

// Blog post routes
router.post('/blog-posts', blogPostController.createBlogPost);
router.delete('/blog-posts/:postID', blogPostController.deleteBlogPost);
router.put('/blog-posts/:postID', blogPostController.editBlogPost);
router.patch('/blog-posts/:postID/publish', blogPostController.publishBlogPost);
router.get('/blog-posts', blogPostController.getAllPosts); 

module.exports = router;
