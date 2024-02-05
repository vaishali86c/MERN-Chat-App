const jwt = require('jsonwebtoken');
// let secretKey = require('../config/generateSecretKey');

const authMiddleware = (req, res, next) => {
  let splitToken = req.header('Authorization').split(' ');
  let token = splitToken[1];

  secretKey = process.env.JWT_SECRET;

  console.log('Received Token:', token);

  if (!token) {
    return next({ status: 401, message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded Token Payload:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error.message);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return next({ status: 401, message: 'Invalid token' });
    }

    next({ status: 500, message: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;