const HistoricalEventModel = require('../models/HistoricalEvent'); 

class HistoricalEvent {
  // Create a new historical event
  static async createHistoricalEvent(req, res) {
    try {
      const historicalEvent = new HistoricalEventModel(req.body);
      await historicalEvent.save();
      res.status(201).json(historicalEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all historical events
  static async getAllHistoricalEvents(req, res) {
    try {
      const events = await HistoricalEventModel.find();
      res.status(200).json(events);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get historical events by year
static async getHistoricalEventByYear(req, res) {
  try {
    const events = await HistoricalEventModel.find({ year: req.params.year });
    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No Historical Events found for this year' });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

}

module.exports = HistoricalEvent;
