import { motion } from 'framer-motion'
import { useState } from 'react'

const LandingPage = ({ onGetStarted }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-black rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-gray-900 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-bold text-black mb-6 sm:mb-8 font-jakarta leading-tight"
        >
          Create
          <motion.span 
            className="block text-gray-600"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Interactive
          </motion.span>
          <motion.span 
            className="block"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Gift Cards
          </motion.span>
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto font-poppins leading-relaxed px-4"
        >
          Design beautiful, animated gift cards with realistic interactions. 
          Share memorable moments with personalized touches and stunning animations.
        </motion.p>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative px-8 sm:px-12 py-3 sm:py-4 bg-black text-white rounded-full font-semibold text-base sm:text-lg font-poppins overflow-hidden"
        >
          <motion.span
            className="relative z-10"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            Get Started
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-gray-800"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? 0 : "-100%" }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2"
            animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}

export default LandingPage