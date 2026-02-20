// controllers/cart.controller.js
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

/**
 * Get user cart
 */
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, return empty
      return res.json({ userId, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add or update item in cart
 */
const addOrUpdateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isActive || product.isDeleted) {
      return res.status(400).json({ message: "Invalid product" });
    }

    let cart = await Cart.findOne({ userId });
    const priceSnapshot = product.price;

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity, priceSnapshot }]
      });
    } else {
      // Update existing cart
      const index = cart.items.findIndex(item => item.productId.toString() === productId);
      if (index > -1) {
        // Update quantity
        cart.items[index].quantity = quantity;
        cart.items[index].priceSnapshot = priceSnapshot;
      } else {
        // Add new item
        cart.items.push({ productId, quantity, priceSnapshot });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Remove item from cart
 */
const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Clear cart
 */
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addOrUpdateCartItem,
  removeCartItem,
  clearCart
};
