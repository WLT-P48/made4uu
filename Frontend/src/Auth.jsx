import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  // ADDED: 'name' is now tracked in the form data
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
    setSuccess(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    const endpoint = isLogin ? '/login' : '/register';
    const backendUrl = `http://localhost:5000/api/user${endpoint}`;
    
    try {
      // We send the whole formData (which now includes name if registering)
      const res = await axios.post(backendUrl, formData);
      
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role); 
        setSuccess("Authentication successful. Redirecting...");
        setTimeout(() => window.location.href = '/home', 1000);
      } else {
        setSuccess("Account created successfully. Please sign in.");
        setTimeout(() => {
          setIsLogin(true); 
          setFormData({ name: '', email: '', password: '' }); 
          setSuccess('');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || "Connection Error: Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans selection:bg-black selection:text-white">
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white w-full max-w-[400px] rounded-none md:rounded-2xl shadow-[0_20px_40px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-100"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="p-10">
          
          {/* Brand Header */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
            <h1 className="text-3xl font-black tracking-[0.2em] uppercase text-black mb-2">Made4U</h1>
            <div className="h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={isLogin ? 'login' : 'register'}
                  variants={itemVariants}
                  initial="hidden" animate="visible" exit="exit"
                  className="text-gray-400 text-xs tracking-widest uppercase font-semibold"
                >
                  {isLogin ? 'Sign in to continue' : 'Create your account'}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {success && (
                <motion.div layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-sm font-medium text-black bg-gray-100 p-4 rounded-lg text-center">
                  {success}
                </motion.div>
              )}
              {error && (
                <motion.div layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-sm font-medium text-white bg-black p-4 rounded-lg text-center">
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Input Group */}
            <motion.div layout variants={itemVariants} className="space-y-5">
              
              {/* Animated Name Field: Only shows on Register mode */}
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required={!isLogin} // Only required when registering
                      className="w-full px-4 py-4 bg-transparent border-b-2 border-gray-200 focus:border-black outline-none transition-colors duration-300 text-gray-900 placeholder-gray-400 font-medium"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-4 bg-transparent border-b-2 border-gray-200 focus:border-black outline-none transition-colors duration-300 text-gray-900 placeholder-gray-400 font-medium"
                  onChange={handleChange}
                  value={formData.email}
                />
              </motion.div>

              <motion.div layout>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-4 bg-transparent border-b-2 border-gray-200 focus:border-black outline-none transition-colors duration-300 text-gray-900 placeholder-gray-400 font-medium"
                  onChange={handleChange}
                  value={formData.password}
                />
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.div layout variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-bold tracking-widest uppercase text-sm py-4 rounded-lg transition-transform disabled:opacity-50"
              >
                {loading ? <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>Processing...</motion.span> : (isLogin ? 'Sign In' : 'Register')}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div layout variants={itemVariants} className="mt-8 mb-8 relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold"><span className="bg-white px-4 text-gray-400">Or</span></div>
          </motion.div>
  
          {/* Google Auth */}
          <motion.div layout variants={itemVariants} className="flex justify-center w-full">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                  try {
                    const res = await axios.post('http://localhost:5000/api/user/google-login', { token: credentialResponse.credential });
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('role', res.data.role); 
                    setSuccess("Authentication successful.");
                    setTimeout(() => window.location.href = '/home', 1000);
                  } catch (err) {
                    setError("Google authentication failed.");
                  }
              }}
              onError={() => setError('Google Login Failed')}
              theme="outline"
              size="large"
              width="320"
            />
          </motion.div>

          {/* Toggle View */}
          <motion.div layout variants={itemVariants} className="mt-10 text-center text-xs tracking-wide text-gray-500 font-medium">
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
              className="text-black hover:text-gray-500 transition-colors uppercase tracking-widest border-b border-black hover:border-transparent pb-1"
            >
              {isLogin ? 'Create an account' : 'Sign in to existing account'}
            </button>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;