import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ── Detect mobile ──────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : true
  )
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isMobile
}

// ── Placeholder products shown while real data loads ───────
const PLACEHOLDER_PRODUCTS = [
  {
    id: 'ph1',
    name: 'Stanley Tumbler 40oz',
    img: 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=600&q=85&fit=crop',
    price: 2499,
    oldPrice: 3199,
  },
  {
    id: 'ph2',
    name: 'Vacuum Flask Gift Set',
    img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=85&fit=crop',
    price: 1899,
    oldPrice: 2499,
  },
  {
    id: 'ph3',
    name: 'Personalized Mug',
    img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=85&fit=crop',
    price: 799,
    oldPrice: 999,
  },
  {
    id: 'ph4',
    name: 'Premium Gift Combo',
    img: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&q=85&fit=crop',
    price: 3299,
    oldPrice: 4199,
  },
  {
    id: 'ph5',
    name: 'Custom Bottle Set',
    img: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=600&q=85&fit=crop',
    price: 1599,
    oldPrice: 1999,
  },
]

// ── Skeleton card (shimmer) ────────────────────────────────
function SkeletonCard({ width, height, isCenter }) {
  return (
    <div
      className="absolute rounded-2xl md:rounded-3xl overflow-hidden"
      style={{ width, height }}
    >
      {/* Shimmer image area */}
      <div
        className="w-full h-full relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#e0e7ff 0%,#c7d2fe 50%,#ddd6fe 100%)' }}
      >
        <div className="absolute inset-0 skeleton-shimmer" />

        {/* Faint product icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg width={isCenter ? 64 : 44} height={isCenter ? 64 : 44} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="0.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </div>

        {/* Top-right badge skeleton */}
        <div className="absolute top-3 right-3 w-14 h-6 rounded-full bg-white/40 overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>

        {/* Bottom price tag skeleton */}
        <div className="absolute bottom-3 left-3 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg flex gap-2 items-center">
          <div className="w-14 h-4 rounded-full overflow-hidden relative"
            style={{ background: 'linear-gradient(90deg,#c7d2fe,#ddd6fe)' }}>
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          <div className="w-10 h-3 rounded-full bg-gray-200 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main HeroRunway ────────────────────────────────────────
export default function HeroRunway({ products, loading }) {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  // Sort real products by discount
  const sortedReal = [...(products || [])].sort((a, b) => {
    const da = a.oldPrice > a.price ? Math.round(((a.oldPrice - a.price) / a.oldPrice) * 100) : 0
    const db = b.oldPrice > b.price ? Math.round(((b.oldPrice - b.price) / b.oldPrice) * 100) : 0
    return db - da
  })

  // Use real products if ≥3, otherwise use placeholders
  const heroProducts = sortedReal.length >= 3 ? sortedReal : PLACEHOLDER_PRODUCTS
  const isPlaceholder = sortedReal.length < 3

  // Auto-advance carousel
  useEffect(() => {
    if (heroProducts.length < 3) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroProducts.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [heroProducts.length])

  const handleProductClick = (productId) => {
    if (!isPlaceholder) navigate(`/product/${productId}`)
  }

  const getDimensions = (position) => {
    if (position === 'center') {
      return isMobile
        ? { width: '200px', height: '267px' }
        : { width: '280px', height: '373px' }
    }
    return isMobile
      ? { width: '150px', height: '200px' }
      : { width: '200px', height: '267px' }
  }

  // ── LOADING state: show 3 shimmer skeleton cards ───────────
  if (loading) {
    const centerDim = getDimensions('center')
    const sideDim = getDimensions('side')
    return (
      <div className="relative flex items-center justify-center w-full max-w-5xl h-[280px] md:h-[450px]">
        {/* Left skeleton */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.55, x: isMobile ? -120 : -170 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ position: 'absolute', rotate: '-6deg', zIndex: 10 }}
        >
          <SkeletonCard width={sideDim.width} height={sideDim.height} isCenter={false} />
        </motion.div>

        {/* Center skeleton */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', zIndex: 20 }}
        >
          <SkeletonCard width={centerDim.width} height={centerDim.height} isCenter={true} />
        </motion.div>

        {/* Right skeleton */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.55, x: isMobile ? 120 : 170 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ position: 'absolute', rotate: '6deg', zIndex: 10 }}
        >
          <SkeletonCard width={sideDim.width} height={sideDim.height} isCenter={false} />
        </motion.div>

        {/* Loading label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-0 flex items-center gap-2"
        >
          {[0, 0.15, 0.3].map((d, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: `${d}s` }} />
          ))}
          <span className="text-xs text-gray-400 font-medium">Loading products…</span>
          {[0.45, 0.6, 0.75].map((d, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: `${d}s` }} />
          ))}
        </motion.div>

        {/* Spotlight */}
        <div className="absolute bottom-4 md:bottom-10 w-[140px] md:w-[280px] h-[20px] md:h-[40px] bg-indigo-300 opacity-30 blur-2xl rounded-full" />

        <style>{`
          @keyframes shimmer { 0%{transform:translateX(-150%)} 100%{transform:translateX(250%)} }
          .skeleton-shimmer {
            background: linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.75) 50%,transparent 100%);
            animation: shimmer 1.7s ease-in-out infinite;
          }
        `}</style>
      </div>
    )
  }

  // ── LOADED state: real or placeholder carousel ─────────────
  return (
    <div className="relative flex items-center justify-center w-full max-w-5xl h-[280px] md:h-[450px]">

      {/* "Demo" label when showing placeholders */}
      {isPlaceholder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-indigo-500 tracking-wide">Featured Products</span>
        </motion.div>
      )}

      <AnimatePresence>
        {heroProducts.map((product, i) => {
          const total = heroProducts.length
          const position =
            i === index ? 'center'
            : i === (index - 1 + total) % total ? 'left'
            : i === (index + 1) % total ? 'right'
            : 'hidden'

          if (position === 'hidden') return null

          const discount = product.oldPrice > product.price
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0

          const dimensions = getDimensions(position)

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                x: position === 'center' ? 0 : position === 'left'
                  ? (isMobile ? -140 : -200)
                  : (isMobile ? 140 : 200),
                scale: position === 'center' ? 1 : 0.7,
                opacity: position === 'center' ? 1 : 0.55,
                rotate: position === 'center' ? 0 : position === 'left' ? -6 : 6,
                zIndex: position === 'center' ? 20 : 10,
              }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 18 }}
              className="absolute rounded-2xl md:rounded-3xl shadow-2xl cursor-pointer overflow-hidden group"
              style={{ width: dimensions.width, height: dimensions.height }}
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.style.background = 'linear-gradient(135deg,#e0e7ff,#ddd6fe)'
                }}
              />

              {/* Hover overlay */}
              {position === 'center' && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              )}

              {/* Price tag */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                <span className="text-sm md:text-base font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
                {product.oldPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through ml-1.5">₹{product.oldPrice?.toLocaleString()}</span>
                )}
              </div>

              {/* Discount badge */}
              {discount > 0 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                  {discount}% OFF
                </div>
              )}

              {/* Center card: product name on hover */}
              {position === 'center' && (
                <div className="absolute bottom-14 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center">
                    <p className="text-xs font-bold text-gray-800 truncate">{product.name}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Dot nav */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {heroProducts.slice(0, Math.min(heroProducts.length, 7)).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all duration-300 hover:scale-125"
            style={{
              width: i === index ? 18 : 6,
              height: 6,
              background: i === index
                ? 'linear-gradient(90deg,#3b82f6,#6366f1)'
                : 'rgba(99,102,241,0.25)',
            }}
          />
        ))}
      </div>

      {/* Spotlight glow */}
      <div className="absolute bottom-4 md:bottom-10 w-[140px] md:w-[280px] h-[20px] md:h-[40px] bg-indigo-300 opacity-30 blur-2xl rounded-full" />

      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-150%)} 100%{transform:translateX(250%)} }
        .skeleton-shimmer {
          background: linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.75) 50%,transparent 100%);
          animation: shimmer 1.7s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}