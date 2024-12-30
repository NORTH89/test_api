const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.'
    });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: 'Invalid token.'
        });
    }
};

module.exports = verifyToken;