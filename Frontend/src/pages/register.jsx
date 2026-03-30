import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
    setSuccess(''); 
  };

  // --- STEP 1: Send OTP ---
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) return setError("Please enter your Full Name.");
    if (!formData.email.trim()) return setError("Please enter your Email Address.");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) return setError("Please enter a valid email format.");
    if (!formData.password) return setError("Please enter a Password.");

    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      await axios.post(`${baseUrl}/api/user/send-otp`, { email: formData.email });
      
      setSuccess(`Verification code sent to ${formData.email}`);
      setStep(2); // Move to OTP input
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: Verify & Register ---
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.otp || formData.otp.length < 6) return setError("Please enter the 6-digit code.");

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/user/register', formData);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500); 
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP or Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // --- Form Animations ---
  const fadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const primaryButtonHover = { scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 10 } };
  const buttonTap = { scale: 0.98 };
  const brandHover = { scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 10 } }; 

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-[#F9FAFB] font-sans selection:bg-black selection:text-white">
      
      {/* Left Side Branding */}
            <div className="hidden md:flex md:w-1/2 flex-col justify-center items-start p-16 lg:p-24 relative z-10">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <motion.h1 
                  className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight mb-6 cursor-default"
                  whileHover={brandHover}
                >
                  <span className="hover:text-indigo-700 transition-colors duration-300">Made4</span>
                  <span className="text-indigo-600 hover:text-indigo-500 transition-colors duration-300">UU</span>
                </motion.h1>
                <p className="text-gray-600 text-lg max-w-md leading-relaxed not-italic">
                  Welcome to a smarter way to shop. Register now to securely manage your orders, save your favorite items, and enjoy a streamlined checkout process.
                </p>
              </motion.div>
            </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative z-10">
        <div className="w-full max-w-md">
          
          <div className="mb-10 md:hidden text-left">
            <h1 className="text-4xl font-black text-black tracking-tight mb-2 cursor-default flex items-center">
              <motion.span 
                whileHover={{ scale: 1.05 }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-slate-900 hover:text-indigo-700 transition-colors duration-300 inline-block origin-left"
              >
                Made4
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05 }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-indigo-600 inline-block origin-left"
              >
                UU
              </motion.span>
            </h1>
          </div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-3xl font-bold text-black mb-2">{step === 1 ? 'Create an Account' : 'Verify Email'}</h2>
            <p className="text-gray-500 text-sm font-medium">{step === 1 ? 'Fill in your details to get started.' : `We sent a code to ${formData.email}`}</p>
          </motion.div>

          <form onSubmit={step === 1 ? handleSendOTP : handleVerifyAndRegister} className="space-y-6">
            <AnimatePresence mode="wait">
              {success && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-sm font-medium text-green-800 bg-green-50 p-4 rounded-lg text-center border border-green-100 shadow-sm">
                  {success.startsWith('Verification code sent to') ? (
                    <>
                      Verification code sent to{' '}
                      <a href={`mailto:${formData.email}`} className="text-blue-600 font-bold hover:text-blue-800 underline decoration-blue-300 underline-offset-2 transition-colors">
                        {formData.email}
                      </a>
                    </>
                  ) : (
                    success
                  )}
                </motion.div>
              )}
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-sm font-medium text-red-800 bg-red-50 p-4 rounded-lg text-center border border-red-100 shadow-sm">
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-8 min-h-[180px]">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                  {/* Name Input */}
                  <div className="relative">
                    <input 
                      id="reg-name" 
                      type="text" 
                      name="name" 
                      className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 font-medium focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent" 
                      onChange={handleChange} 
                      value={formData.name} 
                      placeholder="Name" 
                    />
                    <label htmlFor="reg-name" className="absolute left-0 -top-3.5 text-gray-500 font-medium text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none ">
                      Full Name
                    </label>
                  </div>
                  
                  {/* Email Input */}
                  <div className="relative">
                    <input 
                      id="reg-email" 
                      type="email" 
                      name="email" 
                      className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 font-medium focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent" 
                      onChange={handleChange} 
                      value={formData.email} 
                      placeholder="Email" 
                    />
                    <label htmlFor="reg-email" className="absolute left-0 -top-3.5 text-gray-500 font-medium text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none">
                      Email Address
                    </label>
                  </div>
                  
                  {/* Password Input */}
                  <div className="relative">
                    <input 
                      id="reg-password" 
                      type="password" 
                      name="password" 
                      className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 font-medium focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent" 
                      onChange={handleChange} 
                      value={formData.password} 
                      placeholder="Password" 
                    />
                    <label htmlFor="reg-password" className="absolute left-0 -top-3.5 text-gray-500 font-medium text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none">
                      Password
                    </label>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 flex flex-col items-center justify-center h-full w-full">
                  <div className="relative w-full">
                    <input 
                      id="reg-otp" 
                      type="text" 
                      name="otp" 
                      maxLength="6" 
                      className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent font-black tracking-widest text-center text-xl" 
                      onChange={handleChange} 
                      value={formData.otp} 
                      placeholder="000000" 
                    />
                    <label htmlFor="reg-otp" className="absolute left-0 -top-3.5 text-gray-500 font-medium text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none text-center w-full">
                      6-Digit OTP
                    </label>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-indigo-600 font-bold hover:text-black transition-colors">
                    Wrong email? Go back
                  </button>
                </motion.div>
              )}
            </div>

            <motion.div variants={fadeUp} className="pt-6">
              <motion.button 
                type="submit" 
                disabled={loading} 
                whileHover={primaryButtonHover} 
                whileTap={buttonTap} 
                className="w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-bold text-lg py-4 rounded-full shadow-[0_8px_20px_rgba(79,70,229,0.25)] transition-all duration-500 disabled:opacity-70"
              >
                {loading ? 'Processing...' : (step === 1 ? 'Continue to Verification' : 'Verify & Create Account')}
              </motion.button>
            </motion.div>
          </form>

          <motion.div variants={fadeUp} className="my-8 flex items-center">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </motion.div>
  
<motion.div variants={fadeUp} className="flex justify-center w-full mb-8">
  <motion.div 
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    className="w-full max-w-[310px] rounded-full p-[1.5px] bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-[length:200%_200%] shadow-lg overflow-hidden"
  >
    <div className="bg-white w-full rounded-full flex items-center justify-center overflow-hidden">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
            try {
              const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
              const res = await axios.post(`${baseUrl}/api/user/google-login`, { token: credentialResponse.credential });
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('role', res.data.role); 
              setSuccess("Authentication successful.");
              setTimeout(() => navigate("/"), 1000);
            } catch (err) {
              setError("Google authentication failed.");
            }
        }}
        onError={() => setError('Google Login Failed')}
        theme="outline"
        shape="pill"
        text="continue_with"
        size="large"
        /* CHANGED: 300px ensures it fits INSIDE the container without smashing the left wall */
        width="300" 
      />
    </div>
  </motion.div>
</motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center text-sm text-slate-500 font-medium">
            Already have an account?{' '}
             <button onClick={() => navigate('/login')} className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-indigo-600 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
              Sign in here
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Register;