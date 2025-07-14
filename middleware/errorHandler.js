const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            name: err.name,
            message: err.message,
            statusCode
        }
    });
};

module.exports = errorHandler;
