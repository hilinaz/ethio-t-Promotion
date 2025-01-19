const mongoose = require('mongoose');

// Define HistoricalEvent schema
const historicalEventSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
});

// Define methods
historicalEventSchema.statics.getByYear = function (year) {
  return this.find({ year: year });
};

// Create model
const HistoricalEvent = mongoose.model('HistoricalEvent', historicalEventSchema);

module.exports = HistoricalEvent;
