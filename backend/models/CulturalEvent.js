const mongoose = require('mongoose');

// Define CulturalEvent schema
const culturalEventSchema = new mongoose.Schema({
  duration: { type: Number, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

// Define static method for filtering by date
culturalEventSchema.statics.filterByDate = function (start, end) {
  return this.find({ startDate: { $gte: start }, endDate: { $lte: end } });
};

// Create model
const CulturalEvent = mongoose.model('CulturalEvent', culturalEventSchema);

module.exports = CulturalEvent;
