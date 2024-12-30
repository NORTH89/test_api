const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get token from header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Access denied. No token provided'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            status: 'error',
            message: 'Invalid token'
        });
    }
};

module.exports = verifyToken;