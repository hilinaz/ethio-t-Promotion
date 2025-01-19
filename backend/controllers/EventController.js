const EventModel = require('../models/Event'); 

class Event {
  // Create a new event
  static async addEvent(req, res) {
    try {
      const event = new EventModel(req.body);
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all events
  static async getAllEvents(req, res) {
    try {
      const events = await EventModel.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get event details by eventId
  static async getEventDetail(req, res) {
    try {
      const eventId = req.params.eventId; // Extract eventId from params
      const event = await EventModel.findOne({ eventId }); // Query using eventId
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update event content
  static async updateEventContent(req, res) {
    try {
      const eventId = req.params.eventId;
      const event = await EventModel.findOne({ eventId });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      event.content = req.body.content;
      await event.save();
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Filter events by category
  static async filterEventByCategory(req, res) {
    try {
      const events = await EventModel.find({ category: req.params.category });
      res.status(200).json(events);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = Event;
