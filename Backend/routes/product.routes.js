const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  updateProductStock
} = require('../controllers/product.controller');

const router = express.Router();

/**
 * Public Routes
 */
router.get('/', getAllProducts);                     // Get all products (with filters & pagination)
router.get('/:id', getProductById);                 // Get single product by ID
router.get('/category/:categoryId', getProductsByCategory); // Get products by category

/**
 * Admin Routes
 */
router.post('/', createProduct);                    // Create product
router.put('/:id', updateProduct);                 // Update product
router.patch('/:id/stock', updateProductStock);    // Update stock
router.delete('/:id', deleteProduct);              // Soft delete product

module.exports = router;
