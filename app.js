const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

const AppError = require('./utils/appError');
const globaleErrorHandler = require('./utils/globaleErrorHandler');

const app = express();

// Routers
const userRoute = require('./routes/userRoutes');

// DotENV
dotenv.config({ path: './config.env' });

// Middlewares
// Cors
app.use(cors());
// logger
app.use(morgan('dev'));
// BodyParser
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoute);

// Error
app.use('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} route on this server.`, 404));
});

app.use(globaleErrorHandler);

// Exports App
module.exports = app;
