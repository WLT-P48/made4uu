// models/cart.model.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // one cart per user
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      priceSnapshot: {
        type: Number,
        required: true
      }
    }
  ],

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Optional: populate product info automatically
cartSchema.pre(/^find/, function (next) {
  this.populate('items.productId', 'title price images');
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
