import { useState } from 'react'
import { motion } from 'framer-motion'
import useReveal from '../hooks/useReveal'

// ── Perks shown inside the card ────────────────────────────
const PERKS = [
  { icon: '🎁', text: '10% off your first order' },
  { icon: '⚡', text: 'Flash sale alerts first' },
  { icon: '🚚', text: 'Free shipping updates' },
  { icon: '🎨', text: 'New collection previews' },
]

// ── Social proof avatars (initials) ────────────────────────
const AVATARS = [
  { initial: 'P', grad: ['#3b82f6', '#6366f1'] },
  { initial: 'R', grad: ['#8b5cf6', '#ec4899'] },
  { initial: 'A', grad: ['#10b981', '#06b6d4'] },
  { initial: 'S', grad: ['#f59e0b', '#f97316'] },
]

export default function NewsletterCTA() {
  useReveal()

  const [phone, setPhone]       = useState('')
  const [error, setError]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [focused, setFocused]   = useState(false)

  const validate = (val) => {
    if (!val) return 'Please enter your WhatsApp number.'
    if (!/^[6-9]\d{9}$/.test(val.replace(/\s/g, '')))
      return 'Enter a valid 10-digit Indian mobile number.'
    return ''
  }

  const handleSubmit = () => {
    const err = validate(phone)
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
    setPhone(val)
    if (error) setError(validate(val))
  }

  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#f8fafc 0%,#eff6ff 100%)' }}
    >
      {/* Outer bg blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#bfdbfe,#c7d2fe)' }} />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#ddd6fe,#c7d2fe)' }} />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative rounded-3xl overflow-hidden text-center"
            style={{
              background: 'linear-gradient(135deg,#2563eb 0%,#4f46e5 50%,#7c3aed 100%)',
              boxShadow: '0 24px 80px rgba(79,70,229,0.35), 0 4px 16px rgba(0,0,0,0.1)',
            }}
          >

            {/* ── Inner decorative layers ──────── */}
            {/* Top-right large circle */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white opacity-[0.06] pointer-events-none" />
            {/* Bottom-left circle */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white opacity-[0.04] pointer-events-none" />
            {/* Centre glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse,#ffffff,transparent)' }} />
            {/* Dot grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)',
                backgroundSize: '22px 22px',
              }} />
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)' }} />

            {/* ── Content ─────────────────────── */}
            <div className="relative z-10 p-8 md:p-14">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-6"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-white/90">
                  Stay Connected
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight"
              >
                Get Exclusive Deals &amp;{' '}
                <span className="relative inline-block">
                  New Arrivals
                  <span
                    className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full"
                    style={{ background: 'linear-gradient(90deg,#93c5fd,#c4b5fd)' }}
                  />
                </span>
              </motion.h2>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.28, duration: 0.5 }}
                className="text-blue-100 text-sm mb-8"
              >
                Subscribe on WhatsApp &amp; unlock your welcome gift 🎁
              </motion.p>

              {/* ── Perks row ─────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
              >
                {PERKS.map((p, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-3 py-3
                      hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  >
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-white/80 text-[10px] font-semibold leading-tight text-center">{p.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* ── Input + Button ─────────────── */}
              {!submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.42, duration: 0.5 }}
                >
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    {/* Input wrapper */}
                    <div className="relative flex-1">
                      {/* WhatsApp icon inside input */}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
                        </svg>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="10-digit WhatsApp number"
                        value={phone}
                        onChange={handleChange}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        className="w-full pl-10 pr-4 py-3 rounded-full text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200"
                        style={{
                          boxShadow: focused
                            ? '0 0 0 3px rgba(99,102,241,0.25), 0 2px 8px rgba(0,0,0,0.08)'
                            : '0 2px 8px rgba(0,0,0,0.08)',
                          border: error ? '1.5px solid #f87171' : '1.5px solid transparent',
                        }}
                      />
                    </div>

                    {/* Subscribe button */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="px-7 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-200
                        hover:-translate-y-0.5 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background: loading ? 'rgba(255,255,255,0.7)' : '#ffffff',
                        color: '#4f46e5',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 12a9 9 0 11-6.219-8.56"/>
                          </svg>
                          Joining…
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          Subscribe
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Validation error */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-xs mt-2 text-center flex items-center justify-center gap-1"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {error}
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                /* ── Success state ─────────────── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                  className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl px-6 py-5 max-w-sm mx-auto"
                >
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-white font-bold text-base mb-1">You're in!</p>
                  <p className="text-blue-100 text-sm">
                    We'll WhatsApp you your <span className="text-white font-semibold">10% off code</span> shortly.
                  </p>
                </motion.div>
              )}

              {/* ── Social proof row ──────────── */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="flex items-center justify-center gap-3 mt-6"
              >
                {/* Stacked avatars */}
                <div className="flex -space-x-2">
                  {AVATARS.map((a, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-indigo-500 flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0"
                      style={{ background: `linear-gradient(135deg,${a.grad[0]},${a.grad[1]})` }}
                    >
                      {a.initial}
                    </div>
                  ))}
                </div>
                <p className="text-blue-100 text-xs">
                  <span className="text-white font-semibold">1,000+ subscribers</span> already joined
                </p>
              </motion.div>

              {/* Fine print */}
              <p className="text-blue-300 text-[11px] mt-4 opacity-80">
                🔒 No spam, ever. Unsubscribe anytime.
              </p>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}