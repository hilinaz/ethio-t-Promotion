const mongoose = require('mongoose');

// Define DiscoverET schema
const discoverETSchema = new mongoose.Schema({
  placeName: { type: String, required: true },
  region: { type: String, required: true },
  highlights: [{ type: String }],
});

// Create model
const DiscoverET = mongoose.model('DiscoverET', discoverETSchema);

module.exports = DiscoverET;
