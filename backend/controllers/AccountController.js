const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const AccountModel = require('../models/Account');  // Assuming this is the Mongoose model

class Account {
  constructor(email, password, username, firstName, lastName, role) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role || 'user';  // Default to 'user' if no role is provided
  }

  // Create a new account (sign up)
  static async signUp(req, res) {
    try {
      const { email, password, username, firstName, lastName } = req.body;

      // Check if the user already exists
      const existingAccount = await AccountModel.findOne({ email });
      if (existingAccount) {
        return res.status(400).json({ message: 'Email is already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate a unique accountID using UUID
      const accountID = uuidv4();  // Generate unique UUID

      // Create a new account
      const account = new AccountModel({
        accountID,
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // Save the new account to the database
      await account.save();

      // Generate an access token
      const accessToken = jwt.sign(
        { accountID: account.accountID, email: account.email, role: account.role },  // Include role in the token
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Generate a refresh token
      const refreshToken = jwt.sign(
        { accountID: account.accountID, email: account.email, role: account.role },  // Include role in the token
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      // Optionally store the refresh token in a secure HttpOnly cookie (for client-side security)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // Use only in HTTPS in production
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Send the response without the password field
      res.status(201).json({
        message: 'Account created successfully',
        account: {
          accountID: account.accountID,
          username: account.username,
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
        },
        accessToken, // Send the access token
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Log in to an account (with access and refresh tokens)
  static async logIn(req, res) {
    try {
      const { email, password } = req.body;

      // Find the account by email
      const account = await AccountModel.findOne({ email });
      if (!account) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate an access token
      const accessToken = jwt.sign(
        { accountID: account.accountID, email: account.email, role: account.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // 1 hour expiration for the access token
      );

      // Generate a refresh token
      const refreshToken = jwt.sign(
        { accountID: account.accountID, email: account.email, role: account.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } // 7 days expiration for the refresh token
      );

      // Optionally store the refresh token in a secure HttpOnly cookie (for client-side security)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // Use only in HTTPS in production
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Send the access token to the client
      res.status(200).json({
        message: 'Login successful',
        accessToken, // Send the access token
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Middleware to verify the JWT access token
  static verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      // Verify the access token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user info to the request object
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }

  // Refresh the access token using the refresh token
  static async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken; // Get the refresh token from cookies

      if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
      }

      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // Generate a new access token
      const accessToken = jwt.sign(
        { accountID: decoded.accountID, email: decoded.email, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ accessToken }); // Send the new access token to the client
    } catch (error) {
      res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
  }

  // Get account details by email (for logged-in user)
  static async getAccountDetails(req, res) {
    try {
      const { email } = req.user; // Use email from the token payload

      // Find the account by email
      const account = await AccountModel.findOne({ email });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      // Return account details
      res.status(200).json({ account });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all accounts (for admin or authorized users)
  static async getAllAccounts(req, res) {
    try {
      // Only allow access if the user has the right role (e.g., admin)
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
      }

      const accounts = await AccountModel.find();
      res.status(200).json({ accounts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Log out of the account
  static logOut(req, res) {
    // Clear the refresh token from the cookies
    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logged out successfully' });
  }
}

module.exports = Account;
