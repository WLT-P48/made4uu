import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedBrand from "../components/common/AnimatedBrand";

const Login = () => {
  const navigate = useNavigate();

  // --- Standard Login States ---
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --- Forgot Password States ---
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [fpStep, setFpStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [fpData, setFpData] = useState({ email: "", otp: "", newPassword: "" });

  // --- Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleFpChange = (e) => {
    setFpData({ ...fpData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // --- Login Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email.trim()) {
      setError("Please enter your Email Address.");
      return;
    }
    if (!formData.password) {
      setError("Please enter your Password.");
      return;
    }

    setLoading(true);

    try {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const res = await axios.post(`${baseUrl}/api/user/login`, formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      setSuccess("Authentication successful. Redirecting...");

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || err.response?.data || "Connection Error",
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot Password: Send OTP ---
  const handleSendFpOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fpData.email.trim()) {
      setError("Please enter your registered Email Address.");
      return;
    }

    setLoading(true);
    try {
      // Endpoint to request password reset OTP
      await axios.post("http://localhost:5000/api/user/forgot-password-otp", {
        email: fpData.email,
      });
      setSuccess(`Verification code sent to ${fpData.email}`);
      setFpStep(2); // Move to OTP and New Password step
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot Password: Verify & Reset ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fpData.otp || fpData.otp.length < 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    if (!fpData.newPassword || fpData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      // Endpoint to verify OTP and update password
      await axios.put("http://localhost:5000/api/user/reset-password", {
        email: fpData.email,
        otp: fpData.otp,
        newPassword: fpData.newPassword,
      });

      setSuccess("Password updated successfully! You can now log in.");
      setTimeout(() => {
        setIsForgotPassword(false);
        setFpStep(1);
        setFpData({ email: "", otp: "", newPassword: "" });
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid OTP or failed to reset password.",
      );
    } finally {
      setLoading(false);
    }
  };

  // --- View Toggle ---
  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setFpStep(1);
    setError("");
    setSuccess("");
    setFpData({ email: "", otp: "", newPassword: "" });
  };

  // --- Form Animations ---
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05 } },
  };

  const primaryButtonHover = {
    scale: 1.03,
    boxShadow: "0px 15px 25px rgba(99, 102, 241, 0.4)",
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const buttonTap = { scale: 0.97 };

  const brandHover = {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 10 },
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-[#FDFBF7] font-sans overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Left Side Branding */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-start p-16 lg:p-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedBrand className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl" />

          <p className="mt-4 text-gray-600 text-base md:text-lg lg:text-xl max-w-lg leading-relaxed">
            Welcome to a smarter way to shop. Sign in now to securely manage
            your orders, save your favorite items, and enjoy a streamlined
            checkout process.
          </p>
        </motion.div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative z-10">
        <motion.div className="w-full max-w-md bg-white/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-3xl shadow-sm md:shadow-none border border-white/50 md:border-none">
          {/* Mobile Header */}
          <div className="mb-8 md:hidden text-left">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 cursor-default inline-block">
              <span className="text-gray-900 transition-colors duration-300 hover:text-indigo-700">
                Made4
              </span>
              <span className="text-indigo-600 transition-colors duration-300 hover:text-indigo-500">
                UU
              </span>
            </h1>
          </div>

          <AnimatePresence mode="wait">
            {!isForgotPassword ? (
              <motion.div
                key="login-form"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div variants={fadeUp} className="mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Sign in
                  </h2>
                  <p className="text-gray-500 text-sm font-medium">
                    Enter your credentials to continue.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm font-medium text-indigo-800 bg-indigo-50/80 p-4 rounded-xl text-center border border-indigo-100 shadow-sm"
                      >
                        {success}
                      </motion.div>
                    )}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm font-medium text-red-800 bg-red-50/80 p-4 rounded-xl text-center border border-red-100 shadow-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-8">
                    {/* FIXED: Added id, htmlFor, and pointer-events-none */}
                    <motion.div variants={fadeUp} className="relative">
                      <input
                        id="login-email"
                        type="email"
                        name="email"
                        className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 font-medium focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="Email"
                      />
                      <label
                        htmlFor="login-email"
                        className="absolute left-0 -top-3.5 text-gray-500 font-medium text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none"
                      >
                        Email Address
                      </label>
                    </motion.div>

                    <motion.div variants={fadeUp} className="relative">
                      <input
                        id="login-password"
                        type="password"
                        name="password"
                        className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 font-medium focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent"
                        onChange={handleChange}
                        value={formData.password}
                        placeholder="Password"
                      />
                      <label
                        htmlFor="login-password"
                        className="absolute left-0 -top-3.5 text-gray-500 font-medium text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none"
                      >
                        Password
                      </label>
                    </motion.div>
                  </div>

                  {/* Forgot Password Link */}
                  <motion.div variants={fadeUp} className="flex justify-end">
                    <button
                      type="button"
                      onClick={toggleForgotPassword}
                      className="text-sm text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </motion.div>

                  <motion.div variants={fadeUp} className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={primaryButtonHover}
                      whileTap={buttonTap}
                      className="w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-bold text-lg py-4 rounded-full shadow-[0_8px_20px_rgba(79,70,229,0.25)] transition-all duration-500 disabled:opacity-70"
                    >
                      {loading ? "Processing..." : "Sign In"}
                    </motion.button>
                  </motion.div>
                </form>

                <motion.div
                  variants={fadeUp}
                  className="my-6 sm:my-8 flex items-center"
                >
                  <div className="flex-1 border-t border-slate-200"></div>
                  <span className="px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                    Or continue with
                  </span>
                  <div className="flex-1 border-t border-slate-200"></div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="flex justify-center w-full mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[300px] md:max-w-[320px] rounded-full p-1 xs:p-1.5 sm:p-2 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 bg-[length:200%_200%] shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    style={{ minHeight: "52px" }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm w-full h-full rounded-full flex items-center justify-center overflow-hidden shadow-sm border border-white/50">
                      <GoogleLogin
                        onSuccess={async (credentialResponse) => {
                          try {
                            const baseUrl =
                              import.meta.env.VITE_API_BASE_URL ||
                              "http://localhost:5000";
                            const res = await axios.post(
                              `${baseUrl}/api/user/google-login`,
                              { token: credentialResponse.credential },
                            );
                            localStorage.setItem("token", res.data.token);
                            localStorage.setItem("role", res.data.role);
                            if (res.data.user) {
                              localStorage.setItem(
                                "user",
                                JSON.stringify(res.data.user),
                              );
                            }
                            setSuccess(
                              "Authentication successful! Redirecting...",
                            );
                            setTimeout(() => navigate("/"), 1500);
                          } catch (err) {
                            setError(
                              "Google authentication failed. Please try again.",
                            );
                          }
                        }}
                        onError={() => setError("Google Login Failed")}
                        theme="outline"
                        shape="pill"
                        text="continue_with"
                        size="large"
                        width="260"
                        logo_alignment="center"
                      />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="mt-12 text-center text-sm text-gray-500 font-medium"
                >
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-indigo-600 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                  >
                    Create one here
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="forgot-password-form"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div variants={fadeUp} className="mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Reset Password
                  </h2>
                  <p className="text-gray-500 font-medium text-sm">
                    {fpStep === 1
                      ? "Enter your email to receive a verification code."
                      : "Enter the OTP and your new password."}
                  </p>
                </motion.div>

                <form
                  onSubmit={
                    fpStep === 1 ? handleSendFpOtp : handleResetPassword
                  }
                  className="space-y-6"
                >
                  <AnimatePresence mode="wait">
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm font-medium text-green-800 bg-green-50/80 p-4 rounded-xl text-center border border-green-100 shadow-sm"
                      >
                        {success.startsWith("Verification code sent to") ? (
                          <>
                            Verification code sent to{" "}
                            <a
                              href={`mailto:${fpData.email}`}
                              className="text-blue-600 font-bold hover:text-blue-800 underline decoration-blue-300 underline-offset-2 transition-colors"
                            >
                              {fpData.email}
                            </a>
                          </>
                        ) : (
                          success
                        )}
                      </motion.div>
                    )}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm font-medium text-red-800 bg-red-50/80 p-4 rounded-xl text-center border border-red-100 shadow-sm"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-8">
                    {fpStep === 1 ? (
                      <motion.div
                        key="step1-email"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                      >
                        {/* FIXED: Added id, htmlFor, and pointer-events-none */}
                        <input
                          id="fp-email"
                          type="email"
                          name="email"
                          className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 font-medium focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent"
                          onChange={handleFpChange}
                          value={fpData.email}
                          placeholder="Email"
                        />
                        <label
                          htmlFor="fp-email"
                          className="absolute left-0 -top-3.5 text-gray-500 font-medium text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none"
                        >
                          Registered Email Address
                        </label>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2-inputs"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8 w-full"
                      >
                        {/* FIXED: Added id, htmlFor, and pointer-events-none */}
                        <div className="relative">
                          <input
                            id="fp-otp"
                            type="text"
                            name="otp"
                            maxLength="6"
                            className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent font-black tracking-widest text-center text-lg"
                            onChange={handleFpChange}
                            value={fpData.otp}
                            placeholder="000000"
                          />
                          <label
                            htmlFor="fp-otp"
                            className="absolute left-0 -top-3.5 text-gray-500 font-medium text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none"
                          >
                            6-Digit OTP
                          </label>
                        </div>

                        {/* FIXED: Added id, htmlFor, and pointer-events-none */}
                        <div className="relative">
                          <input
                            id="fp-newPassword"
                            type="password"
                            name="newPassword"
                            className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-900 font-medium focus:border-indigo-600 focus:outline-none transition-colors placeholder-transparent"
                            onChange={handleFpChange}
                            value={fpData.newPassword}
                            placeholder="New Password"
                          />
                          <label
                            htmlFor="fp-newPassword"
                            className="absolute left-0 -top-3.5 text-gray-500 font-medium text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-600 pointer-events-none"
                          >
                            New Password
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <motion.div variants={fadeUp} className="pt-6 flex gap-3">
                    <motion.button
                      type="button"
                      onClick={toggleForgotPassword}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-full transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={primaryButtonHover}
                      whileTap={buttonTap}
                      className="w-2/3 relative flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-bold text-lg py-4 rounded-full shadow-[0_8px_20px_rgba(79,70,229,0.25)] transition-all duration-500 disabled:opacity-70"
                    >
                      {loading
                        ? "Processing..."
                        : fpStep === 1
                          ? "Send Code"
                          : "Update Password"}
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
