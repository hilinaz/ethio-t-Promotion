const mongoose = require('mongoose');

// Define Feedback schema
const feedbackSchema = new mongoose.Schema({
  feedbackID: { type: Number, required: true },
  rating: { type: Number, required: true },
  dataSubmitted: { type: Date, default: Date.now },
});

// Define methods
feedbackSchema.methods.submitFeedback = function () {
  return this.save();
};

feedbackSchema.methods.updateFeedback = function (newRating) {
  this.rating = newRating;
  return this.save();
};

feedbackSchema.statics.filterByRating = function (rating) {
  return this.find({ rating: { $gte: rating } });
};

// Create model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
