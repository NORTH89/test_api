const jwt = require('jsonwebtoken');

// Token verification
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'No token provided'
        });
    }

    try {
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

// User authorization
const authorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: 'error',
                message: 'Not authorized'
            });
        }
    });
};

// Admin verification
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                status: 'error',
                message: 'Admin access required'
            });
        }
    });
};

module.exports = {
    verifyToken,
    authorization,
    verifyAdmin
};