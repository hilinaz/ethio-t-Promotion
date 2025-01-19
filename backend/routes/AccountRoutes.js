const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Account routes
router.post('/sign-up', accountController.signUp); // Create a new account
router.post('/log-in', accountController.logIn); // Log in
router.post('/log-out', verifyToken, accountController.logOut); // Log out (protected route)

// Add a GET route to fetch account details by email (protected route)
router.get('/account/:email', verifyToken, accountController.getAccountDetails); // Get account details by email

// Add a GET route to fetch all accounts (admin-only route)
router.get('/accounts', verifyToken, verifyAdmin, accountController.getAllAccounts); // Get all accounts

module.exports = router;
