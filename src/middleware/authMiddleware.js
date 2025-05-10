const jwt = require('jsonwebtoken');
const jwt_secret = process.env.jwt; // your secret key

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // remove "Bearer " if present
        const cleanToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(cleanToken, jwt_secret);

        // attach user info to request
        req.user = decoded;

        next(); // pass to the next middleware or route
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = verifyToken;


