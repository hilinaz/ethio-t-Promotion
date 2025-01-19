const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  userID: { type: Number, required: true, unique: true }, // Ensure unique userID
  userName: { type: String, required: true },
  picture: { type: String },
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Define methods
userSchema.methods.updateProfile = function (updatedInfo) {
  this.userName = updatedInfo.userName;
  this.picture = updatedInfo.picture;
  return this.save();
};

userSchema.methods.createBlogPost = function (blogData) {
  // Simulate creating a blog post
  console.log(`Creating blog post: ${blogData.title}`);
};

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
