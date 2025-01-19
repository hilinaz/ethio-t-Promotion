const TripPlanModel = require('../models/TripPlan'); 
const path = require('path');
const fs = require('fs');


class TripPlan {
  // Create a new trip plan
  static async createTripPlan(req, res) {
    try {
      const tripPlan = new TripPlanModel(req.body);
      await tripPlan.save();
      res.status(201).json(tripPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all trip plans
  static async getAllTripPlans(req, res) {
    try {
      const tripPlans = await TripPlanModel.find();
      res.status(200).json(tripPlans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get trip plan by ID (planID as a number)
  static async getTripPlanById(req, res) {
    try {
      const tripPlan = await TripPlanModel.findOne({ planID: Number(req.params.planID) });
      if (!tripPlan) {
        return res.status(404).json({ message: 'Trip plan not found' });
      }
      res.status(200).json(tripPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Edit trip plan
  static async editTripPlan(req, res) {
    try {
      const tripPlan = await TripPlanModel.findOne({ planID: Number(req.params.planID) });
      if (!tripPlan) {
        return res.status(404).json({ message: 'Trip plan not found' });
      }
      tripPlan.startDate = req.body.startDate || tripPlan.startDate;
      tripPlan.endDate = req.body.endDate || tripPlan.endDate;
      tripPlan.title = req.body.title || tripPlan.title;
      await tripPlan.save();
      res.status(200).json(tripPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete trip plan
  static async deleteTripPlan(req, res) {
    try {
      const tripPlan = await TripPlanModel.findOne({ planID: Number(req.params.planID) });
      if (!tripPlan) {
        return res.status(404).json({ message: 'Trip plan not found' });
      }
      await tripPlan.deleteOne();
      res.status(200).json({ message: 'Trip plan deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Add a destination to the trip plan
  static async addDestinationToPlan(req, res) {
    try {
      const tripPlan = await TripPlanModel.findOne({ planID: Number(req.params.planID) });
      if (!tripPlan) {
        return res.status(404).json({ message: 'Trip plan not found' });
      }
      tripPlan.destinations.push(req.body.destination);
      await tripPlan.save();
      res.status(200).json(tripPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Remove a destination from the trip plan
  static async removeDestinationFromPlan(req, res) {
    try {
      const tripPlan = await TripPlanModel.findOne({ planID: Number(req.params.planID) });
      if (!tripPlan) {
        return res.status(404).json({ message: 'Trip plan not found' });
      }
      tripPlan.destinations = tripPlan.destinations.filter(
        (dest) => dest !== req.body.destination
      );
      await tripPlan.save();
      res.status(200).json(tripPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

 // Download trip plan
static async downloadTripPlan(req, res) {
  try {
    const planID = Number(req.params.planID); // Ensure planID is treated as a number

    const tripPlan = await TripPlanModel.findOne({ planID: planID });
    if (!tripPlan) {
      return res.status(404).json({ message: 'Trip plan not found' });
    }

    // Convert the trip plan to JSON format
    const tripPlanJSON = JSON.stringify(tripPlan, null, 2);

    // Set a filename for the download
    const fileName = `tripPlan_${tripPlan.planID}.json`;

    // Ensure the 'downloads' directory exists
    const downloadsDir = path.join(__dirname, '..', 'downloads');
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir); // Create directory if it doesn't exist
    }

    // Temporarily save the file to the server
    const filePath = path.join(downloadsDir, fileName);

    // Write the trip plan data to a file
    fs.writeFileSync(filePath, tripPlanJSON);

    // Send the file to the client
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/json');

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error downloading the file');
      } else {
        // Optionally remove the file after it has been sent
        fs.unlinkSync(filePath); // Clean up the file after sending
      }
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}
}

module.exports = TripPlan;
