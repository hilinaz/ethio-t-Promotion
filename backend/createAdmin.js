const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
const mongoose = require('mongoose');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid'); // Import uuid for generating unique IDs

const saltRounds = 10;

// Hash the password and insert the admin if not already created
const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 50000, // Increased timeout for connection
    });

    console.log('Connected to MongoDB successfully!');

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({ role: 'admin' });

    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.userName);
      return; // Stop further execution if admin exists
    }

    // If no admin exists, create a new one
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);

    const newAdmin = new Admin({
      adminID: uuidv4(),           // Generate a unique adminID using uuid
      userName: process.env.ADMIN_USER_NAME, // Use the userName from environment variable
      role: 'admin',        // Ensure to set the role (e.g., 'admin')
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
