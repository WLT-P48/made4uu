import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TESTIMONIALS } from '../data/constants'
import useReveal from '../hooks/useReveal'

// ── Extra testimonials (appended to your TESTIMONIALS array) ──
const EXTRA_TESTIMONIALS = [
  {
    initial: 'S',
    name: 'Sneha R.',
    location: 'Nagpur, Maharashtra',
    rating: 5,
    text: '"Got a custom flask for my dad\'s retirement — he cried happy tears! The packaging alone is gift-worthy. Will absolutely order again."',
  },
  {
    initial: 'V',
    name: 'Vivek T.',
    location: 'Bangalore, Karnataka',
    rating: 5,
    text: '"Ordered 20 corporate gift sets for our team. Every single one was perfect. Quick turnaround and impeccable quality!"',
  },
  {
    initial: 'N',
    name: 'Neha M.',
    location: 'Hyderabad, Telangana',
    rating: 5,
    text: '"The engraving detail is absolutely stunning. Ordered for my best friend\'s wedding anniversary and she couldn\'t stop gushing about it!"',
  },
]

// Merge constants with extras, ensure rating field exists
const ALL_TESTIMONIALS = [
  ...( Array.isArray(TESTIMONIALS) ? TESTIMONIALS : [] ).map(t => ({ ...t, rating: t.rating ?? 5 })),
  ...EXTRA_TESTIMONIALS,
]

// Avatar gradients cycling per index
const AVATAR_GRADIENTS = [
  ['#3b82f6', '#6366f1'],
  ['#8b5cf6', '#ec4899'],
  ['#10b981', '#06b6d4'],
  ['#f59e0b', '#f97316'],
  ['#ef4444', '#f97316'],
  ['#06b6d4', '#3b82f6'],
]

// Stats shown at top
const STATS = [
  { value: '500+', label: 'Reviews' },
  { value: '4.9★', label: 'Avg Rating' },
  { value: '98%',  label: 'Recommend' },
  { value: '25+',  label: 'Cities' },
]

// Product emojis cycling per index
const EMOJIS = ['🧊', '🎁', '✨', '🏆', '💎', '⭐']

// ── Star renderer ─────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[0,1,2,3,4].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < count ? '#f59e0b' : '#e5e7eb'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

// ── Single card ───────────────────────────────────────────
function TestimonialCard({ t, globalIndex, animDelay = 0 }) {
  const [hovered, setHovered] = useState(false)
  const grad = AVATAR_GRADIENTS[globalIndex % AVATAR_GRADIENTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animDelay, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-white rounded-2xl p-6 border flex flex-col gap-4 h-full"
      style={{
        borderColor: hovered ? 'rgba(99,102,241,0.2)' : '#f3f4f6',
        boxShadow: hovered
          ? '0 12px 40px rgba(99,102,241,0.13), 0 2px 8px rgba(0,0,0,0.04)'
          : '0 2px 12px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Big decorative quote */}
      <div
        className="absolute top-3 right-4 select-none pointer-events-none text-7xl leading-none"
        style={{
          fontFamily: 'Georgia, serif',
          color: hovered ? '#e0e7ff' : '#f3f4f6',
          transition: 'color 0.3s ease',
          lineHeight: 1,
        }}
      >
        "
      </div>

      {/* Stars + Verified */}
      <div className="flex items-center justify-between">
        <Stars count={t.rating ?? 5} />
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Verified
        </span>
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-500 leading-relaxed flex-1 relative z-10">
        {t.text}
      </p>

      {/* Divider */}
      <div className="h-px"
        style={{ background: 'linear-gradient(90deg,transparent,#e5e7eb,transparent)' }} />

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
          style={{
            background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})`,
            transform: hovered ? 'scale(1.12)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          {t.initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-800 truncate">{t.name}</div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            {t.location}
          </div>
        </div>
        {/* Emoji */}
        <span
          className="text-xl flex-shrink-0"
          style={{
            opacity: hovered ? 1 : 0.4,
            transform: hovered ? 'scale(1.25)' : 'scale(1)',
            transition: 'all 0.3s ease',
          }}
        >
          {EMOJIS[globalIndex % EMOJIS.length]}
        </span>
      </div>
    </motion.div>
  )
}

// ── Main Testimonials ─────────────────────────────────────
export default function Testimonials() {
  useReveal()

  const [page, setPage]         = useState(0)
  const [cols, setCols]         = useState(3)
  const [autoPlay, setAutoPlay] = useState(true)
  const [progress, setProgress] = useState(0)
  const intervalRef             = useRef(null)
  const progressRef             = useRef(null)

  // Responsive columns
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640)       setCols(1)
      else if (window.innerWidth < 1024) setCols(2)
      else                               setCols(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const totalPages = Math.max(1, Math.ceil(ALL_TESTIMONIALS.length / cols))

  // Auto-advance + progress bar
  useEffect(() => {
    clearInterval(intervalRef.current)
    clearInterval(progressRef.current)
    setProgress(0)

    if (!autoPlay) return

    let p = 0
    progressRef.current = setInterval(() => {
      p += 1
      setProgress(p)
      if (p >= 100) clearInterval(progressRef.current)
    }, 40) // 40ms × 100 = 4s

    intervalRef.current = setInterval(() => {
      setPage(prev => (prev + 1) % totalPages)
      setProgress(0)
    }, 4000)

    return () => {
      clearInterval(intervalRef.current)
      clearInterval(progressRef.current)
    }
  }, [autoPlay, page, totalPages])

  const goTo = (p) => {
    setPage(p)
    setAutoPlay(false)
    clearInterval(intervalRef.current)
    clearInterval(progressRef.current)
    // Resume autoplay after 8s
    setTimeout(() => setAutoPlay(true), 8000)
  }

  const visibleItems = ALL_TESTIMONIALS.slice(page * cols, page * cols + cols)

  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-[0.07]"
          style={{ background: 'radial-gradient(circle,#93c5fd,#a5b4fc)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-[0.06]"
          style={{ background: 'radial-gradient(circle,#c4b5fd,#ddd6fe)' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle,#4f46e5 1px,transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ───────────────────────────── */}
        <div className="text-center mb-10 reveal opacity-0 translate-y-8 transition-all duration-700">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Real people, real stories — from across India.
          </p>
        </div>

        {/* ── Stats bar ────────────────────────── */}
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl px-4 py-4 text-center border border-gray-100 shadow-sm
                  hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5
                  transition-all duration-300 group cursor-default"
              >
                <div className="text-2xl font-extrabold text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors duration-300">
                  {s.value}
                </div>
                <div className="text-xs text-gray-400 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Cards grid ───────────────────────── */}
        <div
          className={`grid gap-5 ${
            cols === 1 ? 'grid-cols-1'
            : cols === 2 ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {visibleItems.map((t, i) => (
            <TestimonialCard
              key={`${page}-${i}`}
              t={t}
              globalIndex={page * cols + i}
              animDelay={i * 0.07}
            />
          ))}
        </div>

        {/* ── Pagination ───────────────────────── */}
        <div className="flex flex-col items-center gap-3 mt-10">
          {/* Dots + arrows */}
          <div className="flex items-center gap-3">
            {/* Prev */}
            <button
              onClick={() => goTo((page - 1 + totalPages) % totalPages)}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center
                text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-md
                transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300 hover:scale-125"
                  style={{
                    width:  i === page ? 24 : 8,
                    height: 8,
                    background: i === page
                      ? 'linear-gradient(90deg,#3b82f6,#6366f1)'
                      : '#d1d5db',
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => goTo((page + 1) % totalPages)}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center
                text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-md
                transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          {autoPlay && (
            <div className="w-28 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-none"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg,#3b82f6,#6366f1)',
                }}
              />
            </div>
          )}

          {/* Page label */}
          <p className="text-xs text-gray-400 font-medium">
            {page + 1} / {totalPages}
          </p>
        </div>

        {/* ── Bottom CTA ───────────────────────── */}
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 text-center mt-12">
          <p className="text-sm text-gray-400 mb-4">
            Join <span className="font-semibold text-gray-700">1,000+ happy customers</span> across India
          </p>
          <a
            href="https://wa.me/918552062200"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-blue-200
              text-blue-600 font-semibold text-sm bg-white
              hover:bg-blue-600 hover:text-white hover:border-blue-600
              hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200
              transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
            </svg>
            Share Your Experience
          </a>
        </div>

      </div>
    </section>
  )
}