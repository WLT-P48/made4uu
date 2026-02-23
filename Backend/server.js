require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoute = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const orderRoutes = require("./routes/order.routes");
const addressRoutes = require("./routes/address.routes");
const cartRoutes = require("./routes/cart.routes");
const activityLogRoutes = require("./routes/activityLog.routes");

const app = express();

/* ===========================
   MIDDLEWARE
=========================== */

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// Security headers (basic)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

/* ===========================
   ROUTES
=========================== */

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// API routes
app.use("/api/user", authRoute); // <-- Your login endpoint (/api/user/register etc.)
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/activity-logs", activityLogRoutes);

/* ===========================
   ERROR HANDLER
=========================== */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

/* ===========================
   DATABASE CONNECTION
=========================== */


const MONGO_URI = process.env.MONGO_URI; 
const PORT = process.env.PORT || 5000;

// Start server first
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Connect to MongoDB
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected!");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
      process.exit(1);
    });
});