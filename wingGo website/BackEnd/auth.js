const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded payload to the request object
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;