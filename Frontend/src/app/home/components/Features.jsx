import { useState } from 'react'
import { motion } from 'framer-motion'
import { FEATURES } from '../data/constants'
import useReveal from '../hooks/useReveal'

// ── Per-feature accent colours & gradients ─────────────────
// Maps by index — your FEATURES array stays unchanged
const FEATURE_META = [
  { grad: ['#3b82f6', '#6366f1'], glow: 'rgba(99,102,241,0.18)',  light: '#eff6ff', border: 'rgba(99,102,241,0.15)'  },
  { grad: ['#f59e0b', '#f97316'], glow: 'rgba(251,146,60,0.18)',  light: '#fffbeb', border: 'rgba(249,115,22,0.15)'  },
  { grad: ['#10b981', '#06b6d4'], glow: 'rgba(16,185,129,0.18)',  light: '#ecfdf5', border: 'rgba(16,185,129,0.15)'  },
  { grad: ['#8b5cf6', '#ec4899'], glow: 'rgba(139,92,246,0.18)',  light: '#f5f3ff', border: 'rgba(139,92,246,0.15)'  },
  { grad: ['#ef4444', '#f97316'], glow: 'rgba(239,68,68,0.18)',   light: '#fef2f2', border: 'rgba(239,68,68,0.15)'   },
  { grad: ['#06b6d4', '#3b82f6'], glow: 'rgba(6,182,212,0.18)',   light: '#ecfeff', border: 'rgba(6,182,212,0.15)'   },
]

// ── Single feature card ───────────────────────────────────
function FeatureCard({ f, meta, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-6 text-center cursor-default overflow-hidden flex flex-col items-center"
      style={{
        background: hovered ? meta.light : '#ffffff',
        border: `1.5px solid ${hovered ? meta.border : '#f3f4f6'}`,
        boxShadow: hovered
          ? `0 16px 48px ${meta.glow}, 0 2px 8px rgba(0,0,0,0.04)`
          : '0 2px 12px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.35s ease',
      }}
    >
      {/* Corner sparkle decoration */}
      <div
        className="absolute top-3 right-3 text-xs opacity-0 transition-opacity duration-300 select-none"
        style={{ opacity: hovered ? 0.5 : 0 }}
      >
        ✦
      </div>

      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-400"
        style={{
          width: hovered ? '70%' : '0%',
          background: `linear-gradient(90deg,transparent,${meta.grad[0]},${meta.grad[1]},transparent)`,
        }}
      />

      {/* Icon container */}
      <div className="relative mb-5">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-400"
          style={{
            background: `radial-gradient(circle, ${meta.glow}, transparent)`,
            transform: hovered ? 'scale(1.5)' : 'scale(1)',
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Rotating dashed border */}
        <div
          className="absolute -inset-1.5 rounded-2xl"
          style={{
            border: `1.5px dashed ${meta.grad[0]}`,
            opacity: hovered ? 0.4 : 0,
            animation: hovered ? 'spinSlow 6s linear infinite' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Icon box */}
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl z-10 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${meta.grad[0]}, ${meta.grad[1]})`,
            boxShadow: hovered
              ? `0 8px 24px ${meta.glow}, 0 2px 8px rgba(0,0,0,0.1)`
              : `0 4px 14px ${meta.glow}`,
            transform: hovered ? 'scale(1.12) rotate(-5deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          }}
        >
          <span style={{
            transform: hovered ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.35s ease',
            display: 'inline-block',
          }}>
            {f.icon}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-bold text-base mb-2 transition-colors duration-300"
        style={{ color: hovered ? meta.grad[0] : '#111827' }}
      >
        {f.title}
      </h3>

      {/* Desc */}
      <p className="text-sm text-gray-400 leading-relaxed">
        {f.desc}
      </p>

      {/* Bottom "Learn more" hint */}
      <div
        className="flex items-center gap-1 text-xs font-semibold mt-4 transition-all duration-300"
        style={{
          color: meta.grad[0],
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        }}
      >
        Learn more
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>

      {/* Bottom shimmer bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg,transparent,${meta.grad[0]},${meta.grad[1]},transparent)`,
          opacity: hovered ? 0.6 : 0,
        }}
      />
    </motion.div>
  )
}

// ── Main Features ─────────────────────────────────────────
export default function Features() {
  useReveal()

  return (
    <section
      id="features"
      className="py-20 md:py-24 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-[0.07]"
          style={{ background: 'radial-gradient(circle,#93c5fd,#a5b4fc)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: 'radial-gradient(circle,#c4b5fd,#ddd6fe)' }} />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: 'radial-gradient(circle,#6366f1 1px,transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ─────────────────────────── */}
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight"
          >
            Designed for{' '}
            <span className="relative inline-block">
              Excellence
              <span
                className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#3b82f6,#6366f1,#8b5cf6)' }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 max-w-md mx-auto text-sm md:text-base"
          >
            Why <span className="font-semibold text-gray-600">MADE4UU</span> is the preferred choice for personalized gifts.
          </motion.p>
        </div>

        {/* ── Cards grid ─────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={i}
              f={f}
              meta={FEATURE_META[i % FEATURE_META.length]}
              index={i}
            />
          ))}
        </div>

        {/* ── Bottom trust strip ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-3 md:gap-6"
        >
          {[
            { icon: '🔒', text: 'Secure Payments' },
            { icon: '↩️', text: '7-Day Easy Returns' },
            { icon: '📞', text: 'WhatsApp Support' },
            { icon: '🇮🇳', text: 'Made in India' },
            { icon: '🏅', text: 'Quality Guaranteed' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 + i * 0.06, duration: 0.35 }}
              className="flex items-center gap-2 bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-full
                hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-xs font-semibold text-gray-600">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}