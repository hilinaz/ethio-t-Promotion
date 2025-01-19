const mongoose = require('mongoose');

// Define BlogManager schema
const blogManagerSchema = new mongoose.Schema({
  managerID: { type: Number, required: true, unique: true },
  reportedBlogs: [{ type: String }] // List of blog IDs or titles that are reported
});

// Define instance methods for BlogManager
blogManagerSchema.methods.reportBlog = async function (blogID) {
  if (!this.reportedBlogs.includes(blogID)) {
    this.reportedBlogs.push(blogID);
    await this.save();
    return { message: 'Blog reported successfully', blogID };
  }
  throw new Error('Blog is already reported.');
};

blogManagerSchema.methods.deleteBlog = async function (blogID) {
  const index = this.reportedBlogs.indexOf(blogID);
  if (index > -1) {
    this.reportedBlogs.splice(index, 1);
    await this.save();
    return { message: 'Blog removed from reported list', blogID };
  }
  throw new Error('Blog not found in reportedBlogs.');
};

// Create model
const BlogManager = mongoose.model('BlogManager', blogManagerSchema);

module.exports = BlogManager;
