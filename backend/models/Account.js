const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import uuid for generating unique accountID

// Define Account schema
const accountSchema = new mongoose.Schema({
  accountID: { 
    type: String, 
    default: () => uuidv4(),  // Automatically generate a unique accountID using uuid
    unique: true 
  },
  email: { type: String, required: true, unique: true },  // Ensure email is unique
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },  // Ensure username is unique
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },  // Add role field
  createdDate: { type: Date, default: Date.now },  // Automatically set the creation date
});

// Create model
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
