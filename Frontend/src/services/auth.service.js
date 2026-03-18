import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user';

// 1. Check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// 2. Fetch User Profile
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// 3. Update User Profile
export const updateProfile = async (userData) => {
  const token = localStorage.getItem('token');
  const res = await axios.put(`${API_URL}/profile`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// 4. Logout Function
export const logout = () => {
  localStorage.clear(); 
  window.location.href = "/login"; 
};

// 5. Fetch User Addresses (Required for your Profile.jsx)
export const getAddresses = async (userId) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`http://localhost:5000/api/addresses/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// 6. Standard Login
export const login = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data;
};

// 7. Standard Register
export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};