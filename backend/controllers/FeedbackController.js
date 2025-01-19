const FeedbackModel = require('../models/Feedback');

class Feedback {
  // Submit feedback
  static async submitFeedback(req, res) {
    try {
      const feedback = new FeedbackModel(req.body);
      await feedback.save();
      res.status(201).json(feedback);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update feedback
  static async updateFeedback(req, res) {
    try {
      // Query by feedbackID (a number, not MongoDB's _id)
      const feedback = await FeedbackModel.findOne({ feedbackID: req.params.feedbackID });
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
      feedback.rating = req.body.rating;
      feedback.dataSubmitted = req.body.dataSubmitted;
      await feedback.save();
      res.status(200).json(feedback);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = Feedback;
