const jwt = require('jsonwebtoken');
const authMiddlewareagentget = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }
      const decoded = jwt.verify(token, 'ansa@123'); // Verify the token
      req.agent = decoded; // Attach the decoded agent data to the request object
      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
  module.exports=authMiddlewareagentget