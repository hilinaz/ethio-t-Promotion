const BlogPostModel = require('../models/BlogPost');

class BlogPost {
  // Create a new blog post
  static async createBlogPost(req, res) {
    try {
      const blogPost = new BlogPostModel(req.body);
      await blogPost.save();
      res.status(201).json(blogPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a blog post
  static async deleteBlogPost(req, res) {
    try {
      const blogPost = await BlogPostModel.findByIdAndDelete(req.params.postID);
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.status(200).json({ message: 'Blog post deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Edit a blog post
  static async editBlogPost(req, res) {
    try {
      const blogPost = await BlogPostModel.findById(req.params.postID);
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      blogPost.title = req.body.title;
      blogPost.content = req.body.content;
      blogPost.tags = req.body.tags;
      blogPost.image = req.body.image;
      await blogPost.save();
      res.status(200).json(blogPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Publish a blog post
  static async publishBlogPost(req, res) {
    try {
      const blogPost = await BlogPostModel.findById(req.params.postID);
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      blogPost.publishDate = new Date();
      await blogPost.save();
      res.status(200).json(blogPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = BlogPost;
