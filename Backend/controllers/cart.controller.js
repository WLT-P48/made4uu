// controllers/cart.controller.js

const mongoose = require("mongoose");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

/* ==============================
   GET CART
============================== */
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ userId, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   ADD OR UPDATE (MERGE QUANTITY)
============================== */
const addOrUpdateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Invalid product" });
    }

    let cart = await Cart.findOne({ userId });

    const priceSnapshot = product.price;
    const quantityToAdd = quantity || 1;

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        userId,
        items: [
          {
            productId,
            quantity: quantityToAdd,
            priceSnapshot
          }
        ]
      });
    } else {
      // Check if product already exists in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId.toString()
      );

      if (existingItemIndex > -1) {
        // Product exists - merge quantity (add to existing)
        cart.items[existingItemIndex].quantity += quantityToAdd;
      } else {
        // New product - add as new item
        cart.items.push({
          productId,
          quantity: quantityToAdd,
          priceSnapshot
        });
      }

      await cart.save();
    }

    const updatedCart = await Cart.findOne({ userId });

    res.json(updatedCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   REMOVE ITEM
============================== */
const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId.toString()
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   CLEAR CART
============================== */
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ==============================
   UPDATE ITEM QUANTITY (Set absolute quantity)
============================== */
const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Convert productId to string for comparison (handles both string and ObjectId)
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId.toString()
    );

    if (existingItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Set absolute quantity (replace instead of adding)
    cart.items[existingItemIndex].quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findOne({ userId });

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addOrUpdateCartItem,
  removeCartItem,
  clearCart,
  updateCartItemQuantity,
};
