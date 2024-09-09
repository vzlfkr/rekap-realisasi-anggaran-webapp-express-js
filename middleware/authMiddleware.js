const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // const secret_key = "0932349ff3fbfe4a36b9c04a9183e05fb8ee4079999879390a727d1452f7cc3c";
  const secret_key = "aFzYvMfhh2zJzjgMmZ4Wc8w9GdF2TvWvZy7CAEPjv+Zr3bYujGzVCBa5gA==";

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