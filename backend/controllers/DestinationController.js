const DestinationModel = require('../models/Destination');

class Destination {
  // Create a new destination
  static async createDestination(req, res) {
    try {
      const newDestination = new DestinationModel(req.body);
      await newDestination.save();
      res.status(201).json(newDestination);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all destinations
  static async getAllDestinations(req, res) {
    try {
      const destinations = await DestinationModel.find();
      res.status(200).json(destinations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get destination details by destinationID
  static async getDestinationDetail(req, res) {
    try {
      const destinationID = Number(req.params.destinationID); // Convert to number
      if (isNaN(destinationID)) {
        return res.status(400).json({ message: 'Invalid destination ID' });
      }

      const destination = await DestinationModel.findOne({ destinationID });
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
      res.status(200).json(destination);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update destination fee by destinationID
  static async updateDestinationFee(req, res) {
    try {
      const destinationID = Number(req.params.destinationID); // Convert to number
      if (isNaN(destinationID)) {
        return res.status(400).json({ message: 'Invalid destination ID' });
      }

      const destination = await DestinationModel.findOne({ destinationID });
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }

      destination.entryFee = req.body.newFee; // Use `entryFee` instead of `fee`
      await destination.save();
      res.status(200).json(destination);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get destination by destinationID
  static async getDestinationById(req, res) {
    try {
      const destinationID = Number(req.params.destinationID); // Convert to number
      if (isNaN(destinationID)) {
        return res.status(400).json({ message: 'Invalid destination ID' });
      }

      const destination = await DestinationModel.findOne({ destinationID });
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
      res.status(200).json(destination);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = Destination;
