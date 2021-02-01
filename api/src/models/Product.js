const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a product name']
  },
  price: {
    type: Number,
    required: [true, 'Missing price'],
    // default: 0,
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
});

module.exports = mongoose.model('Product', ProductSchema);
