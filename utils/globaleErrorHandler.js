const AppError = require('./appError');
// Cast Error Handling
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

// Duplicate Error Handling
const handleDuplicateFieldDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 404);
};

// Validation Database Error Handling
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalide input data. ${errors.join(' ')}`;
  return new AppError(message, 404);
};

// JWT Error Handling
const handleJWTError = err =>
  new AppError('Invalid token. Please log in again!', 401);

// JWT Expires Error Handling
const handleJWTExpiresError = err =>
  new AppError('Token is Expired. Please log in again.');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.success = false;

  let error = { ...err };

  if (error.name === 'CastError') error = handleCastErrorDB(error);

  if (error.code === 11000) error = handleDuplicateFieldDB(error);

  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

  if (error.name === 'JsonWebTokenError') error = handleJWTError(error);

  if (error.name === 'TokenExpiredError') error = handleJWTExpiresError(error);

  if (error.message === undefined) {
    error.message = err.message;
  }

  res.status(error.statusCode).json({
    success: error.success,
    message: error.message
  });
};
