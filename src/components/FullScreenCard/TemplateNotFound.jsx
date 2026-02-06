import { motion } from 'framer-motion'

const TemplateNotFound = ({ template }) => (
  <div className="min-h-screen w-full bg-white flex items-center justify-center">
    <div className="text-center p-12">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-6xl mb-8"
      >
        ⚠️
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-black mb-4 font-jakarta"
      >
        Template Not Available
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-gray-600 mb-8"
      >
        {template.name} interactive experience is coming soon
      </motion.p>
      <motion.button 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.href = '/'}
        className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
      >
        Create Another Card
      </motion.button>
    </div>
  </div>
)

export default TemplateNotFound