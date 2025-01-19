const NewsEmailModel = require('../models/NewsEmail'); 

class NewsEmail {
  // Create a new newsletter
  static async createNewsletter(req, res) {
    try {
      const newsletter = new NewsEmailModel(req.body);
      await newsletter.save();
      res.status(201).json(newsletter);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Send newsletter to email
  static async sendNewsletter(req, res) {
    try {
      // Parse NewsID as a number
      const newsId = parseInt(req.params.NewsID, 10);

      if (isNaN(newsId)) {
        return res.status(400).json({ message: 'Invalid NewsID. It must be a number.' });
      }

      const newsletter = await NewsEmailModel.findOne({ newsID: newsId });
      if (!newsletter) {
        return res.status(404).json({ message: 'Newsletter not found' });
      }

      // Send the newsletter to the email using the sendNews method
      await newsletter.sendNews(req.body.email);
      res.status(200).json({ message: 'Newsletter sent' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all newsletters
  static async getAllNewsEmails(req, res) {
    try {
      const newsletters = await NewsEmailModel.find();
      res.status(200).json(newsletters);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get newsletter by ID
  static async getNewsEmailById(req, res) {
    try {
      // Parse NewsID as a number
      const newsId = parseInt(req.params.NewsID, 10);

      if (isNaN(newsId)) {
        return res.status(400).json({ message: 'Invalid NewsID. It must be a number.' });
      }

      const newsletter = await NewsEmailModel.findOne({ newsID: newsId });
      if (!newsletter) {
        return res.status(404).json({ message: 'Newsletter not found' });
      }
      res.status(200).json(newsletter);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = NewsEmail;
