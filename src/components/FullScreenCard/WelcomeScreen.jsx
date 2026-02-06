import { motion } from 'framer-motion'

const WelcomeScreen = ({ onReveal }) => (
  <div className="min-h-screen w-full relative overflow-hidden bg-white flex items-center justify-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="text-center max-w-2xl px-8"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-7xl font-bold text-black mb-6 font-jakarta leading-tight">
          You Have
          <span className="block text-gray-600">A Gift</span>
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-1 bg-black mx-auto rounded-full mb-8"
        />
        <p className="text-xl text-gray-700 font-light">
          Something special awaits you
        </p>
      </motion.div>

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReveal}
        className="group relative px-12 py-4 bg-black text-white rounded-full font-medium text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
      >
        <motion.div
          className="absolute inset-0 bg-gray-800"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <span className="relative z-10 flex items-center gap-3">
          Open Gift
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  </div>
)

export default WelcomeScreen