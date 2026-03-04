const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

/**
 * Get dashboard statistics
 */
const getDashboardStats = async (req, res) => {
  try {
    // Get total counts
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments({ isDeleted: false });
    const totalUsers = await User.countDocuments();

    // Get orders by status (excluding cancelled)
    const orderStats = await Order.aggregate([
      { $match: { status: { $ne: "CANCELLED" } } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Calculate pending and delivered counts
    const pendingOrders = (orderStats.find(s => s._id === "PLACED")?.count || 0) +
                          (orderStats.find(s => s._id === "PAID")?.count || 0) +
                          (orderStats.find(s => s._id === "SHIPPED")?.count || 0);
    const deliveredOrders = orderStats.find(s => s._id === "DELIVERED")?.count || 0;

    // Get total revenue from delivered orders
    const revenueData = await Order.aggregate([
      { $match: { status: "DELIVERED" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // Get recent orders for the graph (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentOrdersByDate = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          revenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      stats: {
        totalOrders,
        totalProducts,
        totalUsers,
        pendingOrders,
        deliveredOrders,
        totalRevenue
      },
      recentOrdersByDate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get system status (MongoDB and Cloudinary)
 */
const getSystemStatus = async (req, res) => {
  try {
    const mongoose = require("mongoose");

    // Check MongoDB connection status
    const mongoStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    
    // Check Cloudinary connection
    const { testCloudinaryConnection, isCloudinaryConfigured } = require("../config/cloudinary");
    
    let cloudinaryStatus = "not_configured";
    let cloudinaryMessage = "";
    
    if (isCloudinaryConfigured()) {
      const cloudinaryTest = await testCloudinaryConnection();
      if (cloudinaryTest.success) {
        cloudinaryStatus = "live";
        cloudinaryMessage = "Connected successfully";
      } else {
        cloudinaryStatus = "error";
        cloudinaryMessage = cloudinaryTest.error?.message || "Connection failed";
      }
    } else {
      cloudinaryMessage = "Cloudinary credentials not configured";
    }

    res.json({
      mongodb: {
        status: mongoStatus,
        message: mongoStatus === "connected" ? "MongoDB is connected" : "MongoDB is disconnected"
      },
      cloudinary: {
        status: cloudinaryStatus,
        message: cloudinaryMessage
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getSystemStatus
};
