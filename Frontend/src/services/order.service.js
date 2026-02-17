import { httpClient } from './api';

const ORDER_ENDPOINTS = {
  getOrders: '/orders',
  getOrderById: (id) => `/orders/${id}`,
  createOrder: '/orders',
  cancelOrder: (id) => `/orders/${id}/cancel`,
  getOrderStatus: (id) => `/orders/${id}/status`,
};

const orderService = {
  // Get all orders for current user
  async getOrders(params = {}) {
    try {
      const response = await httpClient.get(ORDER_ENDPOINTS.getOrders, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch orders',
      };
    }
  },

  // Get order by ID
  async getOrderById(orderId) {
    try {
      const response = await httpClient.get(ORDER_ENDPOINTS.getOrderById(orderId));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Order not found',
      };
    }
  },

  // Create new order
  async createOrder(orderData) {
    try {
      const response = await httpClient.post(ORDER_ENDPOINTS.createOrder, orderData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create order',
      };
    }
  },

  // Cancel order
  async cancelOrder(orderId, reason = '') {
    try {
      const response = await httpClient.post(ORDER_ENDPOINTS.cancelOrder(orderId), {
        reason,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to cancel order',
      };
    }
  },

  // Get order status
  async getOrderStatus(orderId) {
    try {
      const response = await httpClient.get(ORDER_ENDPOINTS.getOrderStatus(orderId));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch order status',
      };
    }
  },

  // Format order status for display
  formatStatus(status) {
    const statusMap = {
      'pending': { label: 'Pending', class: 'warning' },
      'processing': { label: 'Processing', class: 'info' },
      'shipped': { label: 'Shipped', class: 'primary' },
      'delivered': { label: 'Delivered', class: 'success' },
      'cancelled': { label: 'Cancelled', class: 'danger' },
      'refunded': { label: 'Refunded', class: 'secondary' },
    };

    return statusMap[status?.toLowerCase()] || { label: status, class: 'secondary' };
  },

  // Calculate order totals
  calculateOrderTotals(items, shipping = 0, taxRate = 0.1) {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = subtotal * taxRate;
    const total = subtotal + tax + shipping;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
    };
  },
};

export default orderService;
