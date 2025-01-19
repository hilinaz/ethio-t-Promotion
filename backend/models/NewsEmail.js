const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config(); // To use environment variables

// Define NewsEmail schema
const newsEmailSchema = new mongoose.Schema({
  newsID: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateSent: { type: Date, default: Date.now },
});

// Define methods
newsEmailSchema.methods.createNewsletter = function (newsletterData) {
  this.title = newsletterData.title;
  this.content = newsletterData.content;
  return this.save();
};

// Set up the transporter for sending emails using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your email address from the environment variable
    pass: process.env.EMAIL_PASS,  // Your app password from the environment variable
  },
});

// Define sendNews method using Nodemailer
newsEmailSchema.methods.sendNews = function (email) {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email from the environment variable
    to: email,                    // Recipient email
    subject: this.title,          // Subject (newsletter title)
    text: this.content,           // Body content (newsletter content)
  };

  // Send the email
  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log('Email sent: ' + info.response);
    })
    .catch(error => {
      console.error('Error sending email: ', error);
      throw error;
    });
};

// Static method to filter newsletters by region (if applicable)
newsEmailSchema.statics.filterByRegion = function (region) {
  return this.find({ region: region });
};

// Create model
const NewsEmail = mongoose.model('NewsEmail', newsEmailSchema);

module.exports = NewsEmail;
