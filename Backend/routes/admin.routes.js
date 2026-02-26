const express = require("express");
const {
  getDashboardStats,
  getSystemStatus
} = require("../controllers/admin.controller");

const router = express.Router();

// Get dashboard statistics
router.get("/stats", getDashboardStats);

// Get system status (MongoDB, Cloudinary)
router.get("/system-status", getSystemStatus);

module.exports = router;
