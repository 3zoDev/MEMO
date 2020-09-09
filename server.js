const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const colors = require('colors');
var morgan = require('morgan');

const errorHandler = require('./middleware/error');

// Route files
const courses = require('./routes/course');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Create the Express application
const app = express();

app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: true }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Connect to datebase
connectDB();

// app use route
app.use('/api/courses', courses);

// Middleware errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(`Server listening on port ${PORT}`.yellow.bold)
);

// Handle unhandle promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
