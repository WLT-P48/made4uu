import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function HeroRunway({ products, loading }) {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()

  // Sort products by discount (highest first), then use all products
  const heroProducts = [...products].sort((a, b) => {
    const discountDiff = (b.oldPrice > b.price ? Math.round(((b.oldPrice - b.price) / b.oldPrice) * 100) : 0) 
                       - (a.oldPrice > a.price ? Math.round(((a.oldPrice - a.price) / a.oldPrice) * 100) : 0)
    return discountDiff
  })

  useEffect(() => {
    if (heroProducts.length < 3) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroProducts.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [heroProducts.length])

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  if (loading || heroProducts.length < 3) {
    return (
      <div className="h-[220px] md:h-[400px] flex items-center justify-center text-gray-400">
        Loading showcase...
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center w-full max-w-5xl h-[280px] md:h-[450px]">

      <AnimatePresence>
        {heroProducts.map((product, i) => {

          const total = heroProducts.length

          const position =
            i === index
              ? "center"
              : i === (index - 1 + total) % total
              ? "left"
              : i === (index + 1) % total
              ? "right"
              : "hidden"

          if (position === "hidden") return null

          const discount = product.oldPrice > product.price
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                x: position === "center" ? 0 : position === "left" ? -120 : 120,
                scale: position === "center" ? 1 : 0.75,
                opacity: position === "center" ? 1 : 0.5,
                rotate: position === "center" ? 0 : position === "left" ? -6 : 6,
                zIndex: position === "center" ? 20 : 10,
              }}
              transition={{ duration: 0.8, type: "spring" }}
              className="absolute rounded-2xl md:rounded-3xl shadow-2xl object-cover h-[220px] md:h-[400px] w-[160px] md:w-auto cursor-pointer overflow-hidden"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Price Tag - Bottom Left */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                <span className="text-sm md:text-lg font-bold text-gray-900">₹{product.price}</span>
                {product.oldPrice > product.price && (
                  <span className="text-xs md:text-sm text-gray-400 line-through ml-2">₹{product.oldPrice}</span>
                )}
              </div>

              {/* % OFF Tag - Top Right */}
              {discount > 0 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs md:text-sm font-bold px-2 py-1 rounded-full shadow-lg">
                  {discount}% OFF
                </div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Spotlight - Smaller on mobile */}
      <div className="absolute bottom-4 md:bottom-10 w-[140px] md:w-[280px] h-[20px] md:h-[40px] bg-indigo-300 opacity-30 blur-2xl rounded-full" />

    </div>
  )
}

