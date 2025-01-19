const jwt = require('jsonwebtoken');

// Middleware to verify the JWT access token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your .env file
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

// Middleware to verify admin privileges
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') { // Ensure the JWT payload includes a 'role' field
    return res.status(403).json({ message: 'Access Denied: Admin privileges required' });
  }
  next(); // Continue to the next middleware or route handler
};

module.exports = {
  verifyToken,
  verifyAdmin,
};
