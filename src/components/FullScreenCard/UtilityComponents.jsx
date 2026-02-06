import { motion } from 'framer-motion'
import Lottie from 'lottie-react'

export const FinaleSlide = ({ slideData, lottieData, templateId }) => {
  if (templateId === 'graduation') {
    return (
      <div className="text-center relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Epic graduation celebration background */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-radial from-green-100 via-transparent to-transparent"
        />
        
        {/* Floating celebration elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100 - Math.random() * 100, 0],
              x: [0, (Math.random() - 0.5) * 200, 0],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
            className="absolute text-2xl sm:text-3xl lg:text-4xl pointer-events-none"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${60 + Math.random() * 20}%`
            }}
          >
            {['🎓', '🎉', '⭐', '🏆', '🎊', '✨'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.5, type: "spring", stiffness: 80 }}
          >
            <motion.h1 
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  "0 10px 30px rgba(76, 175, 80, 0.3)",
                  "0 0 0px rgba(0,0,0,0)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-10xl font-bold text-black mb-6 sm:mb-8 font-jakarta leading-none"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="bg-gradient-to-r from-black via-green-500 via-black to-green-500 bg-clip-text text-transparent bg-[length:300%_100%]"
              >
                {slideData.title}
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 font-light tracking-wide mb-8 sm:mb-12"
            >
              <motion.span
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {slideData.subtitle}
              </motion.span>
            </motion.p>
            
            {/* Success achievement line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "60%", opacity: 1 }}
              transition={{ delay: 1.2, duration: 2, type: "spring" }}
              className="h-1 sm:h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 mx-auto rounded-full mb-12 sm:mb-16 relative overflow-hidden"
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />
            </motion.div>
            
            {/* Lottie celebration animation */}
            {lottieData && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                className="w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 mx-auto mb-8 sm:mb-12"
              >
                <Lottie 
                  animationData={lottieData} 
                  loop={true}
                  className="w-full h-full"
                />
              </motion.div>
            )}
            
            {/* Create Your Own Button */}
            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2 }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 40px rgba(76, 175, 80, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-base sm:text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg relative overflow-hidden"
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <span className="relative z-10">CREATE YOUR OWN</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <motion.h1 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-10xl font-bold text-black mb-6 sm:mb-8 font-jakarta leading-none"
      >
        {slideData.title}
      </motion.h1>
      <motion.p 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 font-light tracking-wide"
      >
        {slideData.subtitle}
      </motion.p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="mt-12 sm:mt-16 w-32 sm:w-40 h-0.5 sm:h-1 bg-black mx-auto rounded-full"
      />
      
      {lottieData && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="w-24 sm:w-32 h-24 sm:h-32 mx-auto mt-6 sm:mt-8"
        >
          <Lottie 
            animationData={lottieData} 
            loop={true}
            className="w-full h-full"
          />
        </motion.div>
      )}
      
      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.href = '/'}
        className="mt-8 sm:mt-12 px-6 sm:px-8 py-2 sm:py-3 bg-black text-white rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg"
      >
        CREATE YOUR OWN
      </motion.button>
    </div>
  )
}

export const CardBackground = ({ config, lottieData, videoRef, template }) => {
  if (config.backgroundLottie && lottieData) {
    return (
      <div className="absolute inset-0">
        <Lottie 
          animationData={lottieData} 
          loop={true}
          className="w-full h-full"
          style={{ objectFit: 'cover' }}
        />
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover opacity-10"
      loop
      muted
      playsInline
    >
      <source src={`/videos/${template.id}-bg.mp4`} type="video/mp4" />
    </video>
  )
}

export const NavigationControls = ({ 
  currentSlide, 
  config, 
  nextSlide, 
  prevSlide, 
  audioPlaying, 
  toggleAudio,
  currentSlideData 
}) => (
  <>
    {/* Swipe Navigation */}
    <div 
      className="absolute inset-0 z-5 grid grid-cols-3"
      style={{ pointerEvents: currentSlideData.type === 'finale' ? 'none' : 'auto' }}
    >
      <div 
        className="cursor-pointer"
        onClick={prevSlide}
        style={{ display: currentSlide > 0 ? 'block' : 'none' }}
      />
      <div />
      <div 
        className="cursor-pointer"
        onClick={nextSlide}
        style={{ display: currentSlide < config.slides.length - 1 ? 'block' : 'none' }}
      />
    </div>

    {/* Navigation Buttons */}
    <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 sm:gap-4 lg:gap-6 z-10">
      {currentSlide > 0 && (
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 sm:w-10 h-8 sm:h-10 bg-black text-white rounded-full flex items-center justify-center font-bold hover:bg-gray-800 transition-colors text-sm sm:text-base"
        >
          ←
        </motion.button>
      )}

      {currentSlide < config.slides.length - 1 && (
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 sm:w-10 h-8 sm:h-10 bg-black text-white rounded-full flex items-center justify-center font-bold hover:bg-gray-800 transition-colors text-sm sm:text-base"
        >
          →
        </motion.button>
      )}

      <motion.button
        onClick={toggleAudio}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-200 text-black rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-sm sm:text-base"
      >
        {audioPlaying ? '♪' : '♫'}
      </motion.button>
    </div>
  </>
)