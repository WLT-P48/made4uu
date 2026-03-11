import React from "react";
import { motion } from "framer-motion";

const AnimatedBrand = () => {
  return (
    <div className="relative inline-block select-none cursor-pointer group">

      {/* Floating Subtle Motion */}
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Brand Text */}
        <motion.h1
          className="relative flex items-center text-lg md:text-xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
        >
          {/* Made4 - Dark Premium */}
          <span className="text-[#0f172a]">
            Made4
          </span>

          {/* UU - Animated Gradient */}
          <motion.span
            className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 
            bg-[length:200%_200%] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            UU
          </motion.span>

          {/* Shine Sweep Effect */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r 
            from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100"
            animate={{ x: ["-120%", "120%"] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
            style={{ mixBlendMode: "overlay" }}
          />
        </motion.h1>

        {/* Running Light Underline */}
        <div className="absolute left-0 -bottom-1 w-full h-[2px] overflow-hidden rounded-full">
          <motion.div
            className="h-full w-24"
            animate={{ x: ["-30%", "130%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background:
                "linear-gradient(90deg, transparent, #8b5cf6, #3b82f6, transparent)",
              filter: "blur(3px)",
            }}
          />
        </div>

      </motion.div>
    </div>
  );
};

export default AnimatedBrand;