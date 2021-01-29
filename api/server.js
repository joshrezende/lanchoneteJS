const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors/safe');

const app = express();

const api = require('./src/routes/api');

// Body parser
app.use(express.json());

// Modo desenvolvimento
const isDevelopMode = () => process.env.NODE_ENV === 'development';

// Montando as rotas para API
app.use('/api', api);

const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(
    colors.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
  ),
);

process.on('unhandledRejection', (err) => {
  console.log(colors.red(`Error: ${err.message}`));
  // Close server & exit process
  // server.close(() => process.exit(1));
});
