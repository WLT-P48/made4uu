const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Get the token from the header
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    // 2. Verify the token using your secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // Let them pass
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};