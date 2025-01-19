const mongoose = require('mongoose');

// Define TripPlan schema
const tripPlanSchema = new mongoose.Schema({
  planID: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destinations: [{ type: String }],
  title: { type: String, required: true }, // Add the title field
});

// Define methods
tripPlanSchema.methods.addDestination = function (destination) {
  this.destinations.push(destination);
  return this.save();
};

tripPlanSchema.methods.removeDestination = function (destination) {
  this.destinations = this.destinations.filter(dest => dest !== destination);
  return this.save();
};

tripPlanSchema.methods.editPlan = function (startDate, endDate) {
  this.startDate = startDate;
  this.endDate = endDate;
  return this.save();
};

// Create model
const TripPlan = mongoose.model('TripPlan', tripPlanSchema);

module.exports = TripPlan;
