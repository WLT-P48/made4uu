const express = require("express");
const {
  getDashboardStats,
  getProductStatusStats,
  getOrderStatusStats,
  getSystemStatus,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser
} = require("../controllers/admin.controller");

const router = express.Router();

// Get dashboard statistics
router.get("/stats", getDashboardStats);

// Get product status statistics
router.get("/product-status", getProductStatusStats);

// Get order status statistics
router.get("/order-status", getOrderStatusStats);

// Get system status (MongoDB, Cloudinary)
router.get("/system-status", getSystemStatus);

// User management routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

module.exports = router;
