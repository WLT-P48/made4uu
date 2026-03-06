import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProfile, updateProfile, logout, isAuthenticated } from '../services/auth.service';
import { getAddresses } from '../services/address.service';
import Loader from "../components/common/Loader";
import AddressManager from '../components/AddressManager';

const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showAddressManager, setShowAddressManager] = useState(false);
  const [addressesLoading, setAddressesLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {

    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      setLoading(true);

      const userData = await getProfile();

      setUser(userData);

      setFormData({
        username: userData.username || '',
        email: userData.email || ''
      });

      if (userData._id) {
        fetchAddresses(userData._id);
      }

    } catch (err) {

      setError(err.response?.data?.message || 'Failed to load profile');

    } finally {

      setLoading(false);

    }
  };

  const fetchAddresses = async (userId) => {

    try {

      setAddressesLoading(true);

      const data = await getAddresses(userId);

      setAddresses(data);

    } catch (err) {

      console.error('Failed to load addresses:', err);

    } finally {

      setAddressesLoading(false);

    }
  };

  const getDefaultAddress = () => {
    return addresses.find(addr => addr.isDefault);
  };

  const defaultAddress = getDefaultAddress();

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError('');
    setSuccess('');

  };

  const handleProfileSubmit = async (e) => {

    e.preventDefault();

    setSaving(true);
    setError('');
    setSuccess('');

    try {

      const result = await updateProfile({
        username: formData.username,
        email: formData.email
      });

      setSuccess(result.message || 'Profile updated successfully');

      setUser({
        ...user,
        username: formData.username,
        email: formData.email
      });

      setIsEditModalOpen(false);

    } catch (err) {

      setError(err.response?.data?.message || 'Failed to update profile');

    } finally {

      setSaving(false);

    }
  };

  const handleLogout = () => {
    logout();
  };

  // ✅ LOADER SHOW WHEN PROFILE IS LOADING
  if (loading) {
    return <Loader />;
  }

  return (

    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8 md:py-12 font-sans">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-black p-6 text-center">

            <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">

              <span className="text-4xl font-bold text-white">

                {user?.username?.charAt(0) || 'U'}

              </span>

            </div>

            <h1 className="text-2xl font-bold text-white">

              {user?.username}

            </h1>

            <p className="text-gray-400 text-sm">

              {user?.role}

            </p>

          </div>

          {/* PROFILE DETAILS */}

          <div className="p-6 space-y-4">

            <div className="bg-gray-50 p-4 rounded-lg">

              <p className="text-xs text-gray-400 uppercase font-bold">

                Username

              </p>

              <p className="text-lg font-semibold">

                {user?.username}

              </p>

            </div>

            <div className="bg-gray-50 p-4 rounded-lg">

              <p className="text-xs text-gray-400 uppercase font-bold">

                Email

              </p>

              <p className="text-lg font-semibold">

                {user?.email}

              </p>

            </div>

            {defaultAddress && (

              <div className="bg-gray-50 p-4 rounded-lg">

                <p className="text-xs text-gray-400 uppercase font-bold">

                  Default Address

                </p>

                <p className="text-sm">

                  {defaultAddress.line1}

                </p>

                <p className="text-sm">

                  {defaultAddress.city}, {defaultAddress.state}

                </p>

              </div>

            )}

          </div>

          {/* ACTION BUTTONS */}

          <div className="p-6 space-y-3">

            <button
              onClick={() => setShowAddressManager(!showAddressManager)}
              className="w-full bg-black text-white py-3 rounded-lg font-bold"
            >
              Manage Addresses
            </button>

            {showAddressManager && (

              <AddressManager
                userId={user?._id}
                onAddressesChange={() => fetchAddresses(user._id)}
              />

            )}

            <a
              href="/orders"
              className="block w-full text-center bg-black text-white py-3 rounded-lg font-bold"
            >
              My Orders
            </a>

            <button
              onClick={handleLogout}
              className="w-full border-2 border-black text-black py-3 rounded-lg font-bold hover:bg-black hover:text-white"
            >
              Logout
            </button>

          </div>

        </div>

      </motion.div>

    </div>

  );

};

export default Profile;