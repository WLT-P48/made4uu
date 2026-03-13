import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { STATS } from '../data/constants'
import useCounter from '../hooks/useCounter'

// ── Enrich each stat with icon, colour, suffix, description ──
// We map by index so your STATS array stays unchanged
const STAT_META = [
  { icon: '😊', color: '#fbbf24', ring: 'rgba(251,191,36,0.25)',  desc: 'Across India'     },
  { icon: '📦', color: '#34d399', ring: 'rgba(52,211,153,0.25)',  desc: 'On time delivery' },
  { icon: '⭐', color: '#f472b6', ring: 'rgba(244,114,182,0.25)', desc: 'Avg 4.9 / 5'      },
  { icon: '🗺️', color: '#60a5fa', ring: 'rgba(96,165,250,0.25)',  desc: 'Pan India reach'  },
]

// ── Single stat card ──────────────────────────────────────
function StatCard({ stat, meta, triggered, index }) {
  const count   = useCounter(stat.target, triggered)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center text-center group cursor-default"
    >
      {/* Glass card */}
      <div
        className="relative w-full rounded-2xl md:rounded-3xl px-4 py-7 md:py-8 overflow-hidden"
        style={{
          background: hovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(16px)',
          border: hovered
            ? `1.5px solid rgba(255,255,255,0.40)`
            : '1.5px solid rgba(255,255,255,0.18)',
          boxShadow: hovered
            ? `0 20px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 30px ${meta.ring}`
            : '0 8px 24px rgba(0,0,0,0.10)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'all 0.35s ease',
        }}
      >
        {/* Background shimmer on hover */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${meta.ring}, transparent 70%)`,
            }}
          />
        )}

        {/* Animated ring around icon */}
        <div className="relative flex items-center justify-center mx-auto mb-4"
          style={{ width: 68, height: 68 }}
        >
          {/* Pulsing outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${meta.color}`,
              opacity: hovered ? 0.6 : 0.3,
              transform: hovered ? 'scale(1.18)' : 'scale(1)',
              transition: 'all 0.35s ease',
            }}
          />
          {/* Rotating dashed ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `1.5px dashed ${meta.color}`,
              opacity: 0.25,
              animation: 'spinRing 8s linear infinite',
            }}
          />
          {/* Icon bg */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg z-10"
            style={{
              background: `radial-gradient(circle, ${meta.ring} 0%, rgba(255,255,255,0.08) 100%)`,
              border: `1.5px solid ${meta.color}40`,
              transform: hovered ? 'scale(1.1) rotate(-6deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 0.35s ease',
            }}
          >
            {meta.icon}
          </div>
        </div>

        {/* Count */}
        <div
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none mb-1 tabular-nums"
          style={{
            color: '#ffffff',
            textShadow: hovered ? `0 0 20px ${meta.color}` : 'none',
            transition: 'text-shadow 0.35s ease',
          }}
        >
          {count.toLocaleString()}
          <span
            className="text-2xl md:text-3xl"
            style={{ color: meta.color, marginLeft: 2 }}
          >+</span>
        </div>

        {/* Label */}
        <div className="text-white font-bold text-sm md:text-base mb-1 tracking-wide">
          {stat.label}
        </div>

        {/* Description */}
        <div
          className="text-xs font-medium transition-all duration-300"
          style={{
            color: 'rgba(255,255,255,0.55)',
            transform: hovered ? 'translateY(0)' : 'translateY(2px)',
            opacity: hovered ? 1 : 0.7,
          }}
        >
          {meta.desc}
        </div>

        {/* Colour accent bar at bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-400"
          style={{
            width: hovered ? '70%' : '30%',
            background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  )
}

// ── Main StatsCounter ─────────────────────────────────────
export default function StatsCounter() {
  const [triggered, setTriggered] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg,#1e3a8a 0%,#312e81 40%,#4c1d95 100%)',
      }}
    >

      {/* ── Background layers ──────────────── */}

      {/* Large blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.4),transparent)' }} />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(139,92,246,0.35),transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(59,130,246,0.20),transparent)' }} />

      {/* Concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.05] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/[0.03] pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.7) 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

      {/* Floating particles */}
      {[
        { t: '15%', l: '8%',  s: 5, d: '0s',   dur: '5s'   },
        { t: '70%', l: '12%', s: 4, d: '1.2s', dur: '6.5s' },
        { t: '25%', r: '10%', s: 6, d: '0.5s', dur: '4.5s' },
        { t: '75%', r: '8%',  s: 4, d: '2s',   dur: '5.5s' },
        { t: '45%', l: '22%', s: 3, d: '3s',   dur: '7s'   },
        { t: '55%', r: '20%', s: 5, d: '1.8s', dur: '4s'   },
      ].map((p, i) => (
        <div key={i}
          className="absolute rounded-full pointer-events-none hidden md:block"
          style={{
            top: p.t, left: p.l, right: p.r,
            width: p.s, height: p.s,
            background: ['#93c5fd','#a5b4fc','#c4b5fd','#6ee7b7','#fde68a','#fbcfe8'][i],
            opacity: 0.5,
            animation: `floatParticle ${p.dur} ease-in-out infinite`,
            animationDelay: p.d,
          }}
        />
      ))}

      {/* ── Section content ──────────────── */}
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white/80 mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Our Journey So Far
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            Numbers That Speak for Themselves
          </h2>
          <p className="text-white/50 text-sm max-w-sm mx-auto">
            Trusted by thousands of happy customers across India.
          </p>
        </motion.div>

        {/* Stat cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.id}
              stat={stat}
              meta={STAT_META[i] ?? STAT_META[0]}
              triggered={triggered}
              index={i}
            />
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/12 px-6 py-3 rounded-full">
            <span className="text-white/50 text-xs font-medium">Trusted by customers in</span>
            <div className="flex items-center gap-1.5">
              {['Mumbai', 'Pune', 'Bangalore', 'Delhi', 'Hyderabad'].map((city, i) => (
                <span key={i} className="text-white/80 text-xs font-semibold">
                  {city}{i < 4 ? <span className="text-white/25 mx-1">·</span> : ''}
                </span>
              ))}
            </div>
            <span className="text-white/50 text-xs font-medium">&amp; 20 more cities</span>
          </div>
        </motion.div>

      </div>

      {/* ── Keyframes ──────────────────────── */}
      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes floatParticle {
          0%,100% { transform: translateY(0) scale(1);    opacity: 0.5; }
          50%      { transform: translateY(-18px) scale(1.3); opacity: 0.2; }
        }
      `}</style>
    </section>
  )
}