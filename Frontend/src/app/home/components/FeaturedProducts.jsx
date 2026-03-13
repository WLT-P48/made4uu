import { useState } from 'react'
import { motion } from 'framer-motion'

import ProductCard from '../../../components/product/ProductCard'
import useReveal from '../hooks/useReveal'

// ── Skeleton card ──────────────────────────────────────────
function SkeletonCard({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm"
    >
      <div className="relative w-full h-44 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#e0e7ff,#c7d2fe,#ddd6fe)' }}>
        <div className="absolute inset-0 sk-shimmer" />
        <div className="absolute top-2.5 left-2.5 w-14 h-5 rounded-full bg-white/40 overflow-hidden">
          <div className="absolute inset-0 sk-shimmer" />
        </div>
        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/60 overflow-hidden">
          <div className="absolute inset-0 sk-shimmer" />
        </div>
      </div>
      <div className="p-3.5 space-y-2.5">
        <div className="h-3 rounded-full bg-gray-200 w-4/5 overflow-hidden relative">
          <div className="absolute inset-0 sk-shimmer" />
        </div>
        <div className="h-3 rounded-full bg-gray-100 w-3/5 overflow-hidden relative">
          <div className="absolute inset-0 sk-shimmer" />
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-sm overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg,#fde68a,#fbbf24)' }}>
              <div className="absolute inset-0 sk-shimmer" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 rounded-full overflow-hidden relative"
            style={{ background: 'linear-gradient(90deg,#c7d2fe,#ddd6fe)' }}>
            <div className="absolute inset-0 sk-shimmer" />
          </div>
          <div className="h-3 w-12 rounded-full bg-gray-100 overflow-hidden relative">
            <div className="absolute inset-0 sk-shimmer" />
          </div>
        </div>
        <div className="h-8 w-full rounded-xl overflow-hidden relative"
          style={{ background: 'linear-gradient(90deg,#e0e7ff,#ede9fe)' }}>
          <div className="absolute inset-0 sk-shimmer" />
        </div>
      </div>
    </motion.div>
  )
}

// ── Main ───────────────────────────────────────────────────
export default function FeaturedProducts({ products, loading }) {
  useReveal()
  const [activeTab, setActiveTab] = useState('all')

  const TABS = [
    { id: 'all',      label: 'All'       },
    { id: 'trending', label: '🔥 Trending' },
    { id: 'new',      label: '✨ New'      },
    { id: 'sale',     label: '🏷️ Sale'    },
  ]

  const getFiltered = () => {
    if (!products?.length) return []
    if (activeTab === 'sale') return products.filter(p => (p.discount ?? 0) > 0).slice(0, 4)
    return products.slice(0, 4)
  }

  const displayed = getFiltered()

  return (
    <section
      id="featured-products"
      className="py-16 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)' }}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-[0.05]"
          style={{ background: 'radial-gradient(circle,#c4b5fd,transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-[0.04]"
          style={{ background: 'radial-gradient(circle,#bfdbfe,transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header row ─────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 reveal opacity-0 translate-y-8 transition-all duration-700">
          {/* Left: title */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-2">
              Best Sellers
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              Our{' '}
              <span className="relative inline-block">
                Best-Selling
                <span className="absolute left-0 -bottom-0.5 h-[3px] w-full rounded-full"
                  style={{ background: 'linear-gradient(90deg,#3b82f6,#6366f1,#8b5cf6)' }} />
              </span>
              {' '}Gifts
            </h2>
            <p className="text-gray-400 text-sm mt-1.5">Curated with love, designed for you.</p>
          </div>

          {/* Right: filter tabs */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{
                  background: activeTab === tab.id
                    ? 'linear-gradient(135deg,#3b82f6,#6366f1)'
                    : '#ffffff',
                  color: activeTab === tab.id ? '#fff' : '#6b7280',
                  border: activeTab === tab.id ? '1.5px solid transparent' : '1.5px solid #e5e7eb',
                  boxShadow: activeTab === tab.id
                    ? '0 4px 12px rgba(99,102,241,0.3)'
                    : '0 1px 3px rgba(0,0,0,0.04)',
                  transform: activeTab === tab.id ? 'translateY(-1px)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Product grid ───────────────────── */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {loading
            ? [0,1,2,3].map(i => <SkeletonCard key={i} index={i} />)
            : displayed.length > 0
              ? displayed.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.42, ease: 'easeOut' }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              : (
                <div className="col-span-full py-12 flex flex-col items-center gap-3 text-center">
                  <div className="text-4xl">🔍</div>
                  <p className="text-gray-500 font-semibold text-sm">No products in this category</p>
                  <button
                    onClick={() => setActiveTab('all')}
                    className="text-xs text-blue-600 font-bold border border-blue-200 px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    Show all →
                  </button>
                </div>
              )
          }
        </motion.div>

        {/* ── Footer row ─────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-6 border-t border-gray-100 reveal opacity-0 translate-y-8 transition-all duration-700">
          {/* Left: trust signal */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 font-semibold px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Free engraving on all orders
            </span>
            <span className="hidden sm:inline text-gray-300">·</span>
            <span className="hidden sm:inline">{loading ? '…' : `${products?.length ?? 0} products available`}</span>
          </div>

          {/* Right: show all CTA — no external link */}
          <button
            onClick={() => setActiveTab('all')}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold
              border-2 border-blue-600 text-blue-600
              hover:bg-blue-600 hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200/60
              transition-all duration-200"
          >
            Explore All Gifts
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

      </div>

      <style>{`
        @keyframes skShimmer { 0%{transform:translateX(-150%)} 100%{transform:translateX(250%)} }
        .sk-shimmer {
          background: linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.78) 50%,transparent 100%);
          animation: skShimmer 1.7s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}