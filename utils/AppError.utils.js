class AppError extends Error {
    contructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('5') ? 'fail' : 'error';

        Error.captureStackTrace(this, this.contructor);
    }
}

module.exports = { AppError };
