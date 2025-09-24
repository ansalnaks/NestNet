const jwt = require('jsonwebtoken');
const secretkey = 'ansa@123';



const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const decoded = jwt.verify(token, secretkey);
        req.user = decoded; 
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};

module.exports = authMiddleware
 
