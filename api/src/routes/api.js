const express = require('express');
const productsRoute = require('./products');
const ordersRoute = require('./orders');

const router = express.Router();

router.use('/products', productsRoute);
router.use('/orders', ordersRoute);

router.use('/', (req, res) => {
  res.status(404).json({
    success: false,
    httpStatusCode: 404,
    errorCode: 404,
    message: 'Resource not found',
  });
});

module.exports = router;
