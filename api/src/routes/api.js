const express = require('express');
// const usersRoute = require('./users');

const router = express.Router();

// router.use('/users', usersRoute);

router.use('/', (req, res) => {
  res.status(404).json({
    success: false,
    httpStatusCode: 404,
    errorCode: 404,
    message: 'Resource not found',
  });
});

module.exports = router;
