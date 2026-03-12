import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { useEffect, useState } from "react";
import HeroRunway from "./HeroRunway";
import AnimatedBrand from "../../../components/common/AnimatedBrand.jsx";

export default function HeroSection({ products, loading }) {

  const typingLines = [
    "Make it yours. Make it iconic.",
    "Stand out. Stay personal.",
    "Perfect for every moment.",
    "A gift that remembers."
  ];

  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = typingLines[lineIndex];
    const speed = isDeleting ? 40 : 70;

    const timer = setTimeout(() => {

      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));

        if (text === current) {
          setTimeout(() => setIsDeleting(true), 1200);
        }

      } else {
        setText(current.slice(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % typingLines.length);
        }
      }

    }, speed);

    return () => clearTimeout(timer);

  }, [text, isDeleting, lineIndex]);

  return (
    <section className="relative min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white">

      {/* Background Glow */}
      <div className="absolute w-[420px] h-[420px] bg-indigo-300/20 blur-3xl rounded-full -top-32 -right-32" />
      <div className="absolute w-[420px] h-[420px] bg-blue-300/20 blur-3xl rounded-full -bottom-32 -left-32" />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex flex-wrap items-center justify-center gap-2 text-center mb-4"
      >
        <AnimatedBrand />
        <span className="text-gray-700 font-semibold text-lg md:text-xl">
          – Where Every Choice Feels Right
        </span>
      </motion.div>

      {/* Typing Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="z-10 text-indigo-600 font-medium text-sm md:text-lg h-8 md:h-10 text-center mb-8"
      >
        {text}
        <span className="animate-pulse ml-1">|</span>
      </motion.p>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="z-10 flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 mb-12"
      >
        <span className="flex items-center gap-1 text-amber-400">
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </span>

        <span className="font-medium">
          500+ Happy Customers
        </span>

        <span className="flex items-center gap-1">
          <IoSparkles className="text-indigo-500" />
          100% Customizable
        </span>
      </motion.div>

      {/* Runway Animation */}
      <div className="w-full max-w-6xl z-10">
        <HeroRunway products={products} loading={loading} />
      </div>

    </section>
  );
}