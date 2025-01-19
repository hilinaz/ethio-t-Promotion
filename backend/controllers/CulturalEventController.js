const CulturalEvent = require('../models/CulturalEvent');

class CulturalEventController {
  // Create a new cultural event
  static async createCulturalEvent(req, res) {
    try {
      const culturalEvent = new CulturalEvent(req.body); 
      await culturalEvent.save(); 
      res.status(201).json(culturalEvent); 
    } catch (error) {
      res.status(400).json({ message: error.message }); 
    }
  }

  // Get all cultural events
  static async getAllCulturalEvents(req, res) {
    try {
      const events = await CulturalEvent.find(); 
      res.status(200).json(events); 
    } catch (error) {
      res.status(400).json({ message: error.message }); 
    }
  }

  // Get a specific cultural event by ID
  static async getCulturalEventById(req, res) {
    try {
      const event = await CulturalEvent.findById(req.params.eventID); // Find the cultural event by ID
      if (!event) {
        return res.status(404).json({ message: 'Event not found' }); 
      }
      res.status(200).json(event); // Return the event
    } catch (error) {
      res.status(400).json({ message: error.message }); // Handle errors
    }
  }

  // Filter cultural events by date
static async filterCulturalEventsByDate(req, res) {
  const { start, end } = req.body;

  // Validate date inputs
  if (!start || !end) {
    return res.status(400).json({ message: 'Start date and end date are required.' });
  }

  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Check if dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format.' });
    }

    const events = await CulturalEvent.filterByDate(startDate, endDate);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while filtering events.', error });
  }
}

}

module.exports = CulturalEventController;
