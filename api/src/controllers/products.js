const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/Product');

// @desc      Get products
// @route     GET /api/products
// @access    Private
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});

  return res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc      Get single product
// @route     GET /api/products/:id
// @access    Private
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`No product with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc      Add product
// @route     POST /api/products
// @access    Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc      Update product
// @route     PUT /api/products/:id
// @access    Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`No product with the id of ${req.params.id}`),
      404
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc      Delete product
// @route     DELETE /api/products/:id
// @access    Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`No product with the id of ${req.params.id}`),
      404
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
