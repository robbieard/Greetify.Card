import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'

const BirthdayEnvelope = ({ recipientName, message, amount, photo }) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const controls = useAnimation()

  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    
    // If dragged up more than 100px, open the envelope
    if (info.offset.y < -100) {
      setIsOpened(true)
      controls.start({
        y: -200,
        opacity: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      })
    } else {
      // Snap back to original position
      controls.start({
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      })
    }
  }

  return (
    <div className="relative w-96 h-80 flex items-center justify-center">
      {/* Envelope Base */}
      <div className="relative w-80 h-56 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg shadow-lg border border-pink-300">
        {/* Envelope Flap */}
        <motion.div
          className="absolute -top-6 left-0 w-full h-16 bg-gradient-to-br from-pink-200 to-pink-300 border border-pink-300"
          style={{
            clipPath: "polygon(0 100%, 50% 0, 100% 100%)"
          }}
          animate={isOpened ? { rotateX: -180 } : { rotateX: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Envelope Decoration */}
        <div className="absolute top-4 right-4 text-2xl">🎂</div>
        <div className="absolute bottom-4 left-4 text-lg">✨</div>

        {/* Pull Tab */}
        <motion.div
          drag="y"
          dragConstraints={{ top: -250, bottom: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={controls}
          whileHover={{ scale: 1.05 }}
          whileDrag={{ scale: 1.1, rotate: isDragging ? 2 : 0 }}
          className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 h-40 bg-white rounded-lg shadow-xl border-2 border-pink-200 cursor-grab active:cursor-grabbing z-10"
        >
          {/* Card Content */}
          <div className="p-4 h-full flex flex-col justify-between">
            <div className="text-center">
              <h3 className="text-lg font-bold text-pink-600 font-jakarta mb-1">
                Happy Birthday! 🎉
              </h3>
              <p className="text-sm text-white-600">For: {recipientName}</p>
            </div>

            {photo && (
              <div className="flex justify-center">
                <img 
                  src={photo} 
                  alt="Recipient" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
                />
              </div>
            )}

            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 font-poppins mb-1">
                {amount}
              </div>
              <p className="text-xs text-gray-600 italic">
                "{message}"
              </p>
            </div>
          </div>

          {/* Pull Indicator */}
          {!isOpened && (
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 flex items-center gap-1"
            >
              <span>↑</span>
              <span>Pull to open</span>
              <span>↑</span>
            </motion.div>
          )}
        </motion.div>

        {/* Success Message */}
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center p-6 bg-white/90 rounded-lg backdrop-blur-sm">
              <div className="text-4xl mb-2">🎊</div>
              <h3 className="text-xl font-bold text-pink-600 font-jakarta mb-2">
                Gift Card Revealed!
              </h3>
              <p className="text-sm text-gray-600">
                Your {amount} gift card is ready to use!
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Particles */}
      {isOpened && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, -100 - Math.random() * 100]
              }}
              transition={{ 
                duration: 2, 
                delay: 0.5 + i * 0.1,
                ease: "easeOut"
              }}
              className="absolute text-2xl"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${30 + Math.random() * 40}%`
              }}
            >
              {['🎉', '🎊', '✨', '🎂', '🎈', '💝'][i]}
            </motion.div>
          ))}
        </>
      )}
    </div>
  )
}

export default BirthdayEnvelope