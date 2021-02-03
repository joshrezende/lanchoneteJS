const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Order = require('../models/Order');

// @desc      Get orders
// @route     GET /api/orders
// @access    Private
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({});

  return res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

// @desc      Get single order
// @route     GET /api/orders/:id
// @access    Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`No order with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc      Add order
// @route     POST /api/orders
// @access    Private
exports.addOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc      Update order
// @route     PUT /api/orders/:id
// @access    Private
exports.updateOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`No order with the id of ${req.params.id}`),
      404
    );
  }

  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: order
  });
});

// @desc      Delete order
// @route     DELETE /api/orders/:id
// @access    Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`No order with the id of ${req.params.id}`),
      404
    );
  }

  await order.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
