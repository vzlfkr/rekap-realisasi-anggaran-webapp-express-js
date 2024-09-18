const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const secret_key = process.env.JWT_SECRET;

  if (!token) {
    console.log('No token found');
    return res.sendStatus(401); // No token found
  }

  jwt.verify(token, secret_key, (err, user) => {
    if (err) {
      console.log('Token verification error:', err.message); // Log the error message
      return res.sendStatus(403); // Invalid token
    }
    req.user = user; // Attach user info to the request
    next(); // Proceed to the next middleware
  });
};

module.exports = authenticateToken;
