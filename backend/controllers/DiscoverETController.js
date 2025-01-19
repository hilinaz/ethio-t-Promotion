const DiscoverETModel = require('../models/DiscoverET'); 

class DiscoverET {
  // Create a new DiscoverET entry
  static async createDiscoverET(req, res) {
    const { placeName, region, highlights } = req.body;

    try {
      const newDiscoverET = new DiscoverETModel({
        placeName,
        region,
        highlights,
      });

      await newDiscoverET.save();
      res.status(201).json(newDiscoverET);
    } catch (err) {
      res.status(500).json({ message: 'Error creating DiscoverET entry', error: err.message });
    }
  }

  // Get all DiscoverET entries
  static async getAllDiscoverET(req, res) {
    try {
      const allDiscoverETs = await DiscoverETModel.find();
      res.status(200).json(allDiscoverETs);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching all DiscoverET entries', error: err.message });
    }
  }

  // Get DiscoverET details by place name
  static async getDiscoverETByPlaceName(req, res) {
    const { placeName } = req.params;

    try {
      const discoverET = await DiscoverETModel.findOne({ placeName });
      if (!discoverET) {
        return res.status(404).json({ message: 'DiscoverET entry not found' });
      }
      res.status(200).json(discoverET);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching DiscoverET entry', error: err.message });
    }
  }

  // Filter DiscoverET entries by region
  static async filterDiscoverETByRegion(req, res) {
    const { region } = req.query;

    try {
      const discoverETEntries = await DiscoverETModel.find({ region });
      if (!discoverETEntries.length) {
        return res.status(404).json({ message: 'No DiscoverET entries found in this region' });
      }
      res.status(200).json(discoverETEntries);
    } catch (err) {
      res.status(500).json({ message: 'Error filtering DiscoverET entries', error: err.message });
    }
  }

  // Update DiscoverET entry
  static async updateDiscoverET(req, res) {
    const { placeName } = req.params;
    const { region, highlights } = req.body;

    try {
      const discoverET = await DiscoverETModel.findOneAndUpdate(
        { placeName },
        { region, highlights },
        { new: true }
      );
      if (!discoverET) {
        return res.status(404).json({ message: 'DiscoverET entry not found' });
      }
      res.status(200).json(discoverET);
    } catch (err) {
      res.status(500).json({ message: 'Error updating DiscoverET entry', error: err.message });
    }
  }

  // Delete DiscoverET entry
  static async deleteDiscoverET(req, res) {
    const { placeName } = req.params;

    try {
      const discoverET = await DiscoverETModel.findOneAndDelete({ placeName });
      if (!discoverET) {
        return res.status(404).json({ message: 'DiscoverET entry not found' });
      }
      res.status(200).json({ message: 'DiscoverET entry deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting DiscoverET entry', error: err.message });
    }
  }
}

module.exports = DiscoverET;
