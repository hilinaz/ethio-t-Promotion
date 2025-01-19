const mongoose = require("mongoose");

// Define BlogPost schema
const blogPostSchema = new mongoose.Schema({
  postID: { type: Number, unique: true }, // Auto-incremented postID
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  image: { type: String },
});

// Pre-save middleware to auto-increment postID
blogPostSchema.pre("save", async function (next) {
  if (this.isNew) {
    const latestPost = await mongoose
      .model("BlogPost")
      .findOne()
      .sort("-postID");
    this.postID = latestPost ? latestPost.postID + 1 : 1;
  }
  next();
});

// Define methods
blogPostSchema.methods.createBlog = function () {
  return this.save();
};

blogPostSchema.methods.deleteBlog = function () {
  return this.remove();
};

blogPostSchema.methods.editBlog = function (updatedContent) {
  this.content = updatedContent;
  return this.save();
};

// Create model
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
