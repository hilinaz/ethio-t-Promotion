const BlogManagerModel = require('../models/BlogManager');  

// BlogManager class for business logic
class BlogManager {
  constructor(managerID) {
    this.managerID = managerID;
  }

  // Report a blog
  async reportBlog(blogID) {
    let blogManager = await BlogManagerModel.findOne({ managerID: this.managerID });
    if (!blogManager) {
      blogManager = new BlogManagerModel({ managerID: this.managerID, reportedBlogs: [] });
    }
    if (!blogManager.reportedBlogs.includes(blogID)) {
      blogManager.reportedBlogs.push(blogID);
      await blogManager.save();
      return { message: 'Blog reported successfully', blogID };
    }
    throw new Error('Blog is already reported.');
  }

  // Review reported blogs
  async reviewReportedBlogs() {
    const blogManager = await BlogManagerModel.findOne({ managerID: this.managerID });
    if (!blogManager) {
      throw new Error('Blog manager not found');
    }
    return blogManager.reportedBlogs;
  }

  // Delete a reported blog
  async deleteBlog(blogID) {
    const blogManager = await BlogManagerModel.findOne({ managerID: this.managerID });
    if (!blogManager) {
      throw new Error('Blog manager not found');
    }
    const index = blogManager.reportedBlogs.indexOf(blogID);
    if (index > -1) {
      blogManager.reportedBlogs.splice(index, 1);
      await blogManager.save();
      return { message: 'Blog removed from reported list', blogID };
    }
    throw new Error('Blog not found in reportedBlogs.');
  }
}

// Controller functions
exports.createBlogManager = async (req, res) => {
  try {
    const existingManager = await BlogManagerModel.findOne({ managerID: req.body.managerID });
    if (existingManager) {
      return res.status(400).json({ message: 'Blog Manager already exists.' });
    }

    const newBlogManager = new BlogManagerModel({
      managerID: req.body.managerID,
      reportedBlogs: []
    });

    await newBlogManager.save();
    res.status(201).json({ message: 'Blog Manager created successfully', blogManager: newBlogManager });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.reportBlog = async (req, res) => {
  try {
    const blogManagerInstance = new BlogManager(req.params.managerID);  
    const result = await blogManagerInstance.reportBlog(req.body.blogID);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.reviewReportedBlogs = async (req, res) => {
  try {
    const blogManagerInstance = new BlogManager(req.params.managerID);  
    const reportedBlogs = await blogManagerInstance.reviewReportedBlogs();
    res.status(200).json({ reportedBlogs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogManagerInstance = new BlogManager(req.params.managerID);  
    const result = await blogManagerInstance.deleteBlog(req.body.blogID);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
