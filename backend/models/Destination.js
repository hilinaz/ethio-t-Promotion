const mongoose = require("mongoose");

// Counter schema for auto-generating IDs
const counterSchema = new mongoose.Schema({
  key: { type: String, required: true },
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

// Define Destination schema
const destinationSchema = new mongoose.Schema({
  destinationID: { type: Number, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  entryFee: { type: Number, required: true },
  category: { type: String, required: true },
});

// Pre-save hook to auto-generate destinationID
destinationSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { key: "destinationID" },
        { $inc: { count: 2 } },
        { new: true, upsert: true } // Create the counter document if it doesn't exist
      );
      this.destinationID = counter.count;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Define methods
destinationSchema.methods.getDetail = function () {
  return {
    name: this.name,
    description: this.description,
    location: this.location,
    image: this.image,
    entryFee: this.entryFee,
  };
};

destinationSchema.methods.updateFee = function (newFee) {
  this.entryFee = newFee;
  return this.save();
};

destinationSchema.methods.updateDescription = function (newDescription) {
  this.description = newDescription;
  return this.save();
};

destinationSchema.statics.searchByCategory = function (category) {
  return this.find({ category: category });
};

destinationSchema.statics.getAvailableDestinations = function () {
  return this.find({});
};

// Create model
const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
