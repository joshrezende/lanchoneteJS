const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'doing', 'done'],
    default: 'pending'
  },
  items: [new mongoose.Schema({
    quantity: {
      type: Number,
      default: 1,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Missing product ID'],
    }
  })],
  pdvUser: {
    type: String,
    required: [true, 'Missing employe']
  },
});

module.exports = mongoose.model('Order', OrderSchema);
