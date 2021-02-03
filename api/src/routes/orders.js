const express = require('express');
const {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders');

const Order = require('../models/Order');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(getOrders)
  .post(addOrder);

router
  .route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
