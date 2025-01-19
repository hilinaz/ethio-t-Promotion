const mongoose = require("mongoose");

// Define Event schema
const eventSchema = new mongoose.Schema({
  eventId: { type: Number, unique: true }, 
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  location: { type: String },
});


eventSchema.pre("save", async function (next) {
  if (this.isNew) {
    const latestEvent = await mongoose
      .model("Event")
      .findOne()
      .sort("-eventId"); 
    this.eventId = latestEvent ? latestEvent.eventId + 1 : 1; 
  }
  next();
});

// Define methods
eventSchema.methods.updateContent = function (newContent) {
  this.content = newContent;
  return this.save();
};

eventSchema.methods.getDetail = function () {
  return {
    title: this.title,
    content: this.content,
    author: this.author,
    category: this.category,
    publishDate: this.publishDate,
    eventId: this.eventId, // Now eventId is auto-generated
  };
};

eventSchema.statics.filterEvent = function (category) {
  return this.find({ category: category });
};

eventSchema.statics.addEvent = function (eventData) {
  const newEvent = new this(eventData);
  return newEvent.save();
};

eventSchema.statics.getByLocation = function (location) {
  return this.find({ location: location });
};

// Create model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
