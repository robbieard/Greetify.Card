import { motion } from 'framer-motion'
import BirthdayEnvelope from './BirthdayEnvelope'
import InteractiveCard from './InteractiveCard'

const GiftCard = ({ template, recipientName, message, amount, photo, photo2, selectedMusic, isInteractive = false }) => {
  // If it's interactive, show the new interactive card system
  if (isInteractive) {
    return (
      <InteractiveCard
        template={template}
        recipientName={recipientName}
        message={message}
        amount={amount}
        photo={photo}
        photo2={photo2}
        selectedMusic={selectedMusic}
        isFullscreen={isInteractive}
      />
    )
  }

  // Default card view for preview and other templates
  return (
    <motion.div
      initial={{ rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-48 sm:h-56 lg:h-64 relative mx-auto"
    >
      {/* Card Background */}
      <div
        className="w-full h-full rounded-xl sm:rounded-2xl bg-white border border-gray-200 relative overflow-hidden shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${template.colors[0]}20, ${template.colors[1]}20)`
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-black/5 blur-xl"></div>
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-black/10 blur-lg"></div>

        {/* Content */}
        <div className="p-4 sm:p-6 h-full flex flex-col justify-between relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <motion.h3
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-black font-bold text-base sm:text-lg lg:text-xl font-jakarta truncate"
              >
                {template.name.split(' ')[1]} Gift Card
              </motion.h3>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-xs sm:text-sm mt-1 truncate"
              >
                For: {recipientName}
              </motion.p>
            </div>

            {/* Photo */}
            {photo && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0 ml-2"
              >
                <img
                  src={photo}
                  alt="Recipient"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </div>

          {/* Amount */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-center"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-poppins">
              {amount}
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-700 text-xs sm:text-sm text-center font-jakarta line-clamp-2"
          >
            "{message}"
          </motion.div>
        </div>

        {/* Shine Effect */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 400, opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute top-0 left-0 w-16 sm:w-20 h-full bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12"
        />
      </div>
    </motion.div>
  )
}

export default GiftCard