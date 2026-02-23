const express = require("express");
const {
  getCart,
  addOrUpdateCartItem,
  removeCartItem,
  clearCart
} = require("../controllers/cart.controller");

const router = express.Router();

/* ==========================
   CART ROUTES
========================== */

// Get cart for a user
router.get("/:userId", getCart);

// Add or update item in cart
router.post("/", addOrUpdateCartItem);

// Remove single item from cart
router.delete("/:userId/item/:productId", removeCartItem);

// Clear all items from cart
router.delete("/:userId/clear", clearCart);

module.exports = router;
