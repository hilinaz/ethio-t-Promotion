// Load environment variables
require('dotenv').config();

// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const eventRoutes = require('./routes/EventRoutes');
const historicalEventRoutes = require('./routes/HistoricalEventRoutes');
const culturalEventRoutes = require('./routes/CulturalEventRoutes');
const discoverETRoutes = require('./routes/DiscoverETRoutes');
const adminRoutes = require('./routes/AdminRoutes');
const newsEmailRoutes = require('./routes/NewsEmailRoutes');
const destinationRoutes = require('./routes/DestinationRoutes');
const blogPostRoutes = require('./routes/BlogPostRoutes');
const tripPlanRoutes = require('./routes/TripPlanRoutes');
const blogManagerRoutes = require('./routes/BlogManagerRoutes');
const accountRoutes = require('./routes/AccountRoutes');
const userRoutes = require('./routes/UserRoutes');
const feedbackRoutes = require('./routes/FeedbackRoutes');

// Initialize the app
const app = express();

// Use environment variable for PORT or default to 5000
const PORT = process.env.PORT || 5000;

// Get MongoDB connection URI from .env file
const MONGO_URI = "mongodb://localhost:27017/";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Route to serve the index.html file from the home-page folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'home-page', 'index.html'));
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 50000,
})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    // Exit the application if connection fails
  });

// Define a test route
app.get('/test', (req, res) => {
  res.send('Server is up and running!');
});

// Use API routes
app.use('/api/events', eventRoutes);
app.use('/api/historicalEvents', historicalEventRoutes);
app.use('/api/culturalEvents', culturalEventRoutes);
app.use('/api/discoverET', discoverETRoutes);
app.use('/api/newsEmails', newsEmailRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/blogPosts', blogPostRoutes);
app.use('/api/tripPlans', tripPlanRoutes);
app.use('/api/blogManagers', blogManagerRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
