class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.success = false;
    this.isOperational = true;
  }
}

module.exports = AppError;
