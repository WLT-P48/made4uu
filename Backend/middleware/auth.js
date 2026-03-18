const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Get the token from multiple possible headers
  let token = req.header('auth-token');
  
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]; // Cleaner way to get the token
  }
  
  if (!token) return res.status(401).json({ message: 'Access Denied: No token provided' });

  try {
    // 2. Verify the token 
    // Use the secret from .env, or a fallback if .env isn't loading correctly
    const secret = process.env.JWT_SECRET || 'my_custom_secret_key_123';
    const verified = jwt.verify(token, secret);
    
    // 3. Attach the user data (id and role) to the request object
    req.user = verified; 
    
    next(); 
  } catch (err) {
    res.status(400).json({ message: 'Invalid or Expired Token' });
  }
  app.use("/uploads", express.json(), express.static("uploads"));
};
