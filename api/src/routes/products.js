const express = require('express');
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

const Product = require('../models/Product');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(getProducts)
  .post(addProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
