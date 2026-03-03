import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: OTP Verification
  const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
    setSuccess(''); 
  };

  // --- STEP 1: Request OTP ---
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
      // Ask backend to email the OTP (We will need to build this route next!)
      await axios.post('http://localhost:5000/api/user/send-otp', { email: formData.email });
      setSuccess(`OTP sent to ${formData.email}`);
      setStep(2); // Slide to the OTP screen
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- STEP 2: Verify OTP & Register ---
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.otp || formData.otp.length < 6) return setError("Please enter the 6-digit OTP.");

    setLoading(true);
    try {
      // Send all details + OTP to register route
      const res = await axios.post('http://localhost:5000/api/user/register', formData);
      setSuccess("Account verified and created! Redirecting...");
      setTimeout(() => navigate("/login"), 1500); 
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP or Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  const slideIn = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };
  const primaryButtonHover = { scale: 1.03, boxShadow: "0px 15px 25px rgba(99, 102, 241, 0.4)", transition: { type: "spring", stiffness: 400, damping: 10 } };
  const buttonTap = { scale: 0.97 };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-slate-50 font-sans overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Aurora Background (Same as before) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0], rotate: [0, 45, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60" />
        <motion.div animate={{ scale: [1, 1.5, 1], x: [0, -50, 0], y: [0, 50, 0], rotate: [0, -45, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-teal-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-50" />
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, 50, 0], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60" />
      </div>

      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-start p-16 lg:p-24 relative z-10">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-6 cursor-default"><span className="text-slate-900">Made4</span><span className="text-indigo-600">UU</span></h1>
          <p className="text-slate-600 text-lg max-w-md leading-relaxed">Secure your account with email verification and unlock your personalized dashboard.</p>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative z-10">
        <div className="w-full max-w-md">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{step === 1 ? "Create an Account" : "Verify Email"}</h2>
            <p className="text-slate-500 text-sm">{step === 1 ? "Fill in your details to get started." : `Enter the 6-digit code sent to ${formData.email}`}</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {success && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 text-sm font-medium text-indigo-800 bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100 shadow-sm">{success}</motion.div>}
            {error && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 text-sm font-medium text-red-800 bg-red-50 p-4 rounded-lg text-center border border-red-100 shadow-sm">{error}</motion.div>}
          </AnimatePresence>
          
          <form onSubmit={step === 1 ? handleSendOTP : handleVerifyAndRegister}>
            <AnimatePresence mode="wait">
              {/* STEP 1 UI: Standard Inputs */}
              {step === 1 && (
                <motion.div key="step1" variants={slideIn} initial="hidden" animate="visible" exit="exit" className="space-y-8">
                  <div className="relative">
                    <input type="text" name="name" className="peer w-full border-b-2 border-slate-300 bg-transparent py-2 text-slate-900 focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent" onChange={handleChange} value={formData.name} placeholder="Full Name" />
                    <label className="absolute left-0 -top-3.5 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600">Full Name</label>
                  </div>
                  <div className="relative">
                    <input type="email" name="email" className="peer w-full border-b-2 border-slate-300 bg-transparent py-2 text-slate-900 focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent" onChange={handleChange} value={formData.email} placeholder="Email" />
                    <label className="absolute left-0 -top-3.5 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600">Email Address</label>
                  </div>
                  <div className="relative">
                    <input type="password" name="password" className="peer w-full border-b-2 border-slate-300 bg-transparent py-2 text-slate-900 focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent" onChange={handleChange} value={formData.password} placeholder="Password" />
                    <label className="absolute left-0 -top-3.5 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600">Password</label>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 UI: OTP Input */}
              {step === 2 && (
                <motion.div key="step2" variants={slideIn} initial="hidden" animate="visible" exit="exit" className="space-y-8 py-4">
                  <div className="relative flex justify-center">
                    <input 
                      type="text" 
                      name="otp" 
                      maxLength="6"
                      className="w-full text-center text-4xl font-bold tracking-[0.5em] border-b-4 border-slate-300 bg-transparent py-4 text-indigo-900 focus:border-indigo-600 focus:outline-none transition-colors placeholder-slate-200" 
                      onChange={handleChange} 
                      value={formData.otp} 
                      placeholder="000000" 
                    />
                  </div>
                  <div className="text-center">
                    <button type="button" onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Wrong email? Go back</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-8">
              <motion.button type="submit" disabled={loading} whileHover={primaryButtonHover} whileTap={buttonTap} className="w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-bold text-lg py-4 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all duration-500 disabled:opacity-70">
                {loading ? 'Processing...' : (step === 1 ? 'Send Verification Code' : 'Verify & Create Account')}
              </motion.button>
            </div>
          </form>

          {/* ... Keep your existing Google Auth and Toggle View code exactly the same here ... */}
          
        </div>
      </div>
    </div>
  );
};

export default Register;