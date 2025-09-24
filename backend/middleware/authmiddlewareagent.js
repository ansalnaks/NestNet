const jwt = require('jsonwebtoken');
const secretkey = 'ansa@123';


const authMiddlewareagent = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const decoded = jwt.verify(token, 'ansa@123'); 
    req.agent = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
module.exports = authMiddlewareagent
  