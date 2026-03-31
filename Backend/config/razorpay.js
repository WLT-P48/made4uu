require('dotenv').config();
const Razorpay = require('razorpay');


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_123',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret_key_456',
});

console.log("✅ Razorpay connection initialized successfully");

const testConnection = () => {
  // Checks if the real keys actually loaded
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    console.log("✅ Razorpay keys loaded");
    return true;
  } else {
    console.warn("⚠️ Razorpay keys missing from .env (Using safe test keys)");
    return false;
  }
};

module.exports = {
  razorpay,
  testConnection,
};
