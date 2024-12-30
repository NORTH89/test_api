const logger = (error, req, res, next) => {
    console.error(`[${new Date().toISOString()}] ${error.stack}`);
    next(error);
};

module.exports = logger;

const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = notFound;
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
};

module.exports = { logger, notFound, errorHandler };