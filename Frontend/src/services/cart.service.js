import httpClient from './api';

// Get cart for a user
export const getCart = async (userId) => {
  try {
    const response = await httpClient.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Add or update item in cart
export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const response = await httpClient.post('/cart', {
      userId,
      productId,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Remove item from cart (MATCHES CONTROLLER)
export const removeFromCart = async (userId, productId) => {
  try {
    const response = await httpClient.delete(`/cart/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Clear entire cart (MATCHES CONTROLLER)
export const clearCart = async (userId) => {
  try {
    const response = await httpClient.delete(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Update cart item quantity (set absolute quantity)
export const updateCartQuantity = async (userId, productId, quantity) => {
  try {
    const response = await httpClient.put(`/cart/${userId}/${productId}`, {
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
};

export default {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartQuantity
};
