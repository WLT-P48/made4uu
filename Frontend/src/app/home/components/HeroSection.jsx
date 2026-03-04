import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import { IoSparkles } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import HeroRunway from './HeroRunway'

export default function HeroSection({ products, loading }) {

  const typingLines = [
    "Make it yours. Make it iconic.",
    "Stand out. Stay personal.",
    "Made4UU Perfect for every moment.",
    "A gift that remembers."
  ]

  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentLine = typingLines[index]
    const speed = isDeleting ? 40 : 70

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentLine.substring(0, text.length + 1))
        if (text === currentLine) {
          setTimeout(() => setIsDeleting(true), 1200)
        }
      } else {
        setText(currentLine.substring(0, text.length - 1))
        if (text === "") {
          setIsDeleting(false)
          setIndex((prev) => (prev + 1) % typingLines.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, index])

  return (
    <section className="min-h-[60vh] md:min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white px-4 relative overflow-hidden py-8 md:py-0">

      {/* Background Glow */}
      <div className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-blue-200 rounded-full opacity-20 blur-3xl top-0 right-0 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-indigo-200 rounded-full opacity-20 blur-3xl bottom-0 left-0 translate-y-1/2 -translate-x-1/3" />

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-900 text-center mb-4 md:mb-3 z-10"
      >
        Made4UU - Where Every Choice Feels Right
      </motion.h1>

      {/* Typing Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm md:text-lg text-indigo-600 font-medium h-8 md:h-10 text-center mb-6 md:mb-10 z-10"
      >
        {text}
        <span className="animate-pulse">|</span>
      </motion.p>

      {/* Sub Info */}
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-6 md:mb-16 z-10">
        <span className="flex items-center gap-1 text-amber-400">
          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
        </span>
        <span>500+ Happy Customers</span>
        <span className="flex items-center gap-1">
          <IoSparkles className="text-indigo-500" /> 100% Customizable
        </span>
      </div>

      {/* Runway Animation */}
      <HeroRunway products={products} loading={loading} />

    </section>
  )
}