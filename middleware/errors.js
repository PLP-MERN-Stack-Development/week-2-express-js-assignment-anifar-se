class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class ValidationError extends Error {
    constructor(message = 'Invalid input') {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

module.exports = { NotFoundError, ValidationError };
