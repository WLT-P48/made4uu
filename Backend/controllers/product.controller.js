const Product = require('../models/product.model');
const Category = require('../models/category.model');

/**
 * Create Product (Admin)
 */
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      categoryId,
      price,
      discountPrice,
      images,
      stock,
      attributes,
      rating,
      reviewCount,
      isActive
    } = req.body;

    // Validate category
    const category = await Category.findById(categoryId);
    if (!category || !category.isActive) {
      return res.status(400).json({ message: 'Invalid or inactive category' });
    }

    const product = await Product.create({
      title,
      description,
      categoryId,
      price,
      discountPrice,
      images,
      stock,
      attributes,
      rating,
      reviewCount,
      isActive
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all products (filters + pagination)
 */
const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      categoryId,
      isActive = true
    } = req.query;

    const query = {
      isDeleted: false
    };

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query)
      .populate('categoryId', 'name slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get single product by ID
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false
    }).populate('categoryId', 'name slug');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get products by category ID
 */
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({
      categoryId,
      isActive: true,
      isDeleted: false
    }).populate('categoryId', 'name slug');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update product (Admin)
 */
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Soft delete product (Admin)
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isDeleted = true;
    product.isActive = false;
    await product.save();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update product stock
 */
const updateProductStock = async (req, res) => {
  try {
    const { stock } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.stock = stock;
    await product.save();

    res.json({
      message: 'Stock updated successfully',
      stock: product.stock
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
  updateProductStock
};
