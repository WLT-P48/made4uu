import { httpClient } from './api';

const ADMIN_ENDPOINTS = {
  getStats: '/admin/stats',
  getSystemStatus: '/admin/system-status',
};

const adminService = {
  // Get dashboard statistics
  async getStats() {
    try {
      const response = await httpClient.get(ADMIN_ENDPOINTS.getStats);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch stats',
      };
    }
  },

  // Get system status (MongoDB, Cloudinary)
  async getSystemStatus() {
    try {
      const response = await httpClient.get(ADMIN_ENDPOINTS.getSystemStatus);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch system status',
      };
    }
  },
};

export default adminService;
