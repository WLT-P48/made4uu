import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroRunway from "./HeroRunway";
import AnimatedBrand from "../../../components/common/AnimatedBrand.jsx";

const TYPING_LINES = [
  "Make it yours. Make it iconic.",
  "Stand out. Stay personal.",
  "Perfect for every moment.",
  "A gift that remembers.",
];

const BG_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1920&q=90&fit=crop",
    tint: "rgba(238,242,255,0.72)",
  },
  {
    url: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1920&q=90&fit=crop",
    tint: "rgba(240,249,255,0.72)",
  },
  {
    url: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1920&q=90&fit=crop",
    tint: "rgba(245,243,255,0.72)",
  },
];

const BADGES = [
  { icon: "⭐", label: "500+ Reviews",     sub: "Avg 4.9 rating",      grad: "from-amber-400 to-orange-400",  dir: "A", pos: "top-[25%] left-[1.5%]" },
  { icon: "🎨", label: "Custom Engraving", sub: "Laser precision",      grad: "from-blue-500 to-indigo-500",   dir: "B", pos: "top-[25%] right-[1.5%]" },
  { icon: "🚚", label: "Free Shipping",    sub: "Orders above ₹999",    grad: "from-emerald-400 to-green-500", dir: "B", pos: "bottom-[28%] left-[1.5%]" },
  { icon: "🏆", label: "Premium Steel",    sub: "Double-wall insulated", grad: "from-violet-500 to-purple-400", dir: "A", pos: "bottom-[28%] right-[1.5%]" },
];

// WhatsApp contact number
const WA_NUMBER = "918552062200";
const WA_MESSAGE = encodeURIComponent("Hi! I want to customize a product.");

export default function HeroSection({ products, loading }) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [bgReady, setBgReady] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState(null);

  // Typing effect
  useEffect(() => {
    const current = TYPING_LINES[lineIndex];
    const speed = isDeleting ? 38 : 68;
    const t = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text === current) setTimeout(() => setIsDeleting(true), 1300);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setLineIndex((p) => (p + 1) % TYPING_LINES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, isDeleting, lineIndex]);

  // Slideshow auto-advance
  useEffect(() => {
    const id = setInterval(() => setSlideIdx((p) => (p + 1) % BG_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  // Preload first bg image
  useEffect(() => {
    const img = new Image();
    img.src = BG_SLIDES[0].url;
    img.onload = () => setBgReady(true);
  }, []);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-20 md:py-24 overflow-hidden">

      {/* ══ BACKGROUND ══════════════════════════════════════ */}

      {/* Base light gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" />

      {/* Real photo at visible opacity */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slideIdx}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: bgReady ? 0.28 : 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0"
        >
          <img
            src={BG_SLIDES[slideIdx].url}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* Colour tint per slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`tint-${slideIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0"
          style={{ background: BG_SLIDES[slideIdx].tint }}
        />
      </AnimatePresence>

      {/* Soft blobs */}
      <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(199,210,254,0.65),rgba(221,214,254,0.3),transparent)" }} />
      <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(191,219,254,0.6),rgba(199,210,254,0.3),transparent)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,rgba(99,102,241,0.11) 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }} />

      {/* Floating orbs */}
      {[
        { t: "12%", l: "7%",  s: 10, d: "0s",   c: "#93c5fd", dur: "4.2s" },
        { t: "22%", r: "10%", s: 7,  d: "1s",   c: "#a5b4fc", dur: "5.5s" },
        { t: "55%", l: "5%",  s: 6,  d: "2.1s", c: "#c4b5fd", dur: "6.1s" },
        { t: "68%", r: "7%",  s: 9,  d: "0.7s", c: "#93c5fd", dur: "4.8s" },
      ].map((o, i) => (
        <div key={i}
          className="absolute rounded-full pointer-events-none hidden md:block"
          style={{
            top: o.t, left: o.l, right: o.r,
            width: o.s, height: o.s,
            background: o.c, opacity: 0.65,
            boxShadow: `0 0 ${o.s * 2}px ${o.c}`,
            animation: `floatOrb ${o.dur} ease-in-out infinite`,
            animationDelay: o.d,
          }}
        />
      ))}

      {/* ══ FLOATING BADGES (xl only) ═══════════════════════ */}
      {BADGES.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 + i * 0.14, duration: 0.55, type: "spring", stiffness: 120 }}
          onMouseEnter={() => setHoveredBadge(i)}
          onMouseLeave={() => setHoveredBadge(null)}
          className={`absolute ${b.pos} z-20 hidden xl:flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 cursor-pointer`}
          style={{
            background: "rgba(255,255,255,0.90)",
            backdropFilter: "blur(20px)",
            border: hoveredBadge === i ? "1.5px solid rgba(99,102,241,0.4)" : "1.5px solid rgba(255,255,255,0.95)",
            boxShadow: hoveredBadge === i
              ? "0 12px 36px rgba(99,102,241,0.22),0 2px 8px rgba(0,0,0,0.06)"
              : "0 6px 24px rgba(99,102,241,0.10),0 2px 8px rgba(0,0,0,0.04)",
            transform: hoveredBadge === i ? "scale(1.08) translateY(-4px)" : "scale(1)",
            transition: "all 0.3s ease",
            animation: `floatBadge${b.dir} ${3.8 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.45}s`,
          }}
        >
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${b.grad} flex items-center justify-center text-base shadow-md flex-shrink-0`}
            style={{
              transform: hoveredBadge === i ? "rotate(-6deg) scale(1.1)" : "none",
              transition: "transform 0.3s ease",
            }}
          >
            {b.icon}
          </div>
          <div>
            <div className="text-gray-800 text-xs font-bold leading-tight">{b.label}</div>
            <div className="text-gray-400 text-[10px] leading-tight">{b.sub}</div>
          </div>
        </motion.div>
      ))}

      {/* ══ MAIN CONTENT ════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Announcement pill */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-blue-100 shadow-sm px-4 py-1.5 rounded-full mb-7 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
        >
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-blue-700 tracking-wide">New Collection Available</span>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-500">Pune's #1 Gift Store 🎁</span>
        </motion.div>

        {/* ★ AnimatedBrand — zero colour overrides ★ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-3"
        >
          <AnimatedBrand />
          <span className="text-gray-500 font-light text-base md:text-xl italic hidden sm:inline">
            — Where Every Choice Feels Right
          </span>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-gray-400 font-light text-sm italic sm:hidden mb-1">
          Where Every Choice Feels Right
        </motion.p>

        {/* Typing subtitle */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-indigo-600 font-semibold text-sm md:text-lg h-8 md:h-10 mb-8 tracking-wide">
          {text}<span className="animate-blink ml-0.5 text-indigo-400">|</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {/* Shop Now — internal route */}
          <Link
            to="/products"
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm text-white overflow-hidden shadow-lg shadow-blue-300/40 hover:shadow-blue-400/60 hover:-translate-y-1 transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }} />
            <span className="relative z-10 flex items-center gap-2">
              Shop Now
              <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </Link>

          {/* Customize — opens WhatsApp via JS, no href linking out */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold text-sm shadow-sm hover:border-green-400 hover:text-green-700 hover:bg-green-50 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <FaWhatsapp className="text-green-500 text-base group-hover:scale-125 transition-transform duration-300" />
            Customize on WhatsApp
          </button>
        </motion.div>

        {/* Social proof pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-2 mb-10"
        >
          {[
            { icon: <span className="flex text-amber-400 text-[10px]"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>, label: "500+ Reviews" },
            { icon: <IoSparkles className="text-indigo-500" />, label: "100% Customizable" },
            { icon: <span>🚚</span>, label: "Free Shipping ₹999+" },
            { icon: <span>🇮🇳</span>, label: "Made in Pune" },
          ].map((p, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.88 + i * 0.07 }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-sm px-3.5 py-1.5 rounded-full text-gray-600 text-xs font-medium cursor-default hover:border-indigo-200 hover:shadow-md transition-all duration-200"
            >
              {p.icon}{p.label}
            </motion.span>
          ))}
        </motion.div>

        {/* ── HeroRunway wrapped in glass card ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="w-full"
        >
          <div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.80)",
              backdropFilter: "blur(24px)",
              border: "1.5px solid rgba(255,255,255,0.95)",
              boxShadow: "0 8px 40px rgba(99,102,241,0.10),0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            {/* Top shine edge */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.35),rgba(168,85,247,0.25),transparent)" }} />

            <div className="p-4 md:p-6">
              <HeroRunway products={products || []} loading={loading} />
            </div>
          </div>
        </motion.div>

        {/* Slide dots */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="flex gap-2 mt-5">
          {BG_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlideIdx(i)}
              className="rounded-full transition-all duration-300 hover:scale-110"
              style={{
                width: i === slideIdx ? 24 : 8, height: 8,
                background: i === slideIdx ? "linear-gradient(90deg,#3b82f6,#6366f1)" : "#d1d5db",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <span className="text-gray-400 text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-gray-400 rounded-full animate-scroll-dot" />
        </div>
      </motion.div>

      {/* ══ KEYFRAMES ════════════════════════════════════════ */}
      <style>{`
        @keyframes floatBadgeA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatBadgeB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
        @keyframes floatOrb    { 0%,100%{transform:translateY(0) scale(1);opacity:0.65} 50%{transform:translateY(-20px) scale(1.2);opacity:0.28} }
        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollDot   { 0%{transform:translateY(0);opacity:1} 80%{transform:translateY(14px);opacity:0} 100%{transform:translateY(0);opacity:0} }
        .animate-blink      { animation:blink 1s step-end infinite; }
        .animate-scroll-dot { animation:scrollDot 1.8s ease-in-out infinite; }
      `}</style>
    </section>
  );
}