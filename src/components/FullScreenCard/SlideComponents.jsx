import { motion } from 'framer-motion'

export const IntroSlide = ({ slideData }) => (
  <div className="text-center relative px-4 sm:px-6 lg:px-8">
    <motion.div
      animate={{ 
        y: [-20, 20, -20],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-8 sm:-top-16 -left-8 sm:-left-16 text-4xl sm:text-5xl lg:text-6xl opacity-20"
    >
      ✨
    </motion.div>
    <motion.div
      animate={{ 
        y: [20, -20, 20],
        rotate: [0, -5, 5, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute -top-4 sm:-top-8 -right-10 sm:-right-20 text-3xl sm:text-4xl lg:text-5xl opacity-20"
    >
      🎈
    </motion.div>
    
    <motion.h1 
      initial={{ y: 100, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 1.2, type: "spring", stiffness: 80 }}
      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black mb-4 sm:mb-6 font-jakarta leading-none relative"
    >
      <motion.span
        animate={{ 
          textShadow: [
            "0 0 0px rgba(0,0,0,0)",
            "0 5px 15px rgba(0,0,0,0.1)",
            "0 0 0px rgba(0,0,0,0)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {slideData.title}
      </motion.span>
    </motion.h1>
    
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 200, opacity: 1 }}
      transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
      className="h-0.5 bg-gradient-to-r from-transparent via-black to-transparent mx-auto mb-6 sm:mb-8 max-w-[80vw]"
    />
    
    <motion.p 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 font-light tracking-wide relative"
    >
      <motion.span
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {slideData.subtitle}
      </motion.span>
    </motion.p>
  </div>
)

export const NameSlide = ({ slideData, templateId, content }) => (
  <div className="text-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
    {templateId === 'birthday' && (
      <>
        <motion.div
          animate={{ 
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            rotate: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-5"
        >
          <div className="w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-black rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 1.5, type: "spring", stiffness: 60 }}
          className="relative z-10"
        >
          <motion.h1 
            animate={{ 
              scale: [1, 1.02, 1],
              letterSpacing: ["0em", "0.05em", "0em"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black mb-6 sm:mb-8 font-jakarta leading-none"
          >
            {slideData.title}
          </motion.h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.3 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, type: "spring", stiffness: 100 }}
          className="relative"
        >
          <motion.div 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black font-jakarta leading-none p-2 sm:p-4 rounded-2xl"
          >
            {content}
          </motion.div>
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 10, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          className="absolute top-10 sm:top-20 right-10 sm:right-20 text-2xl sm:text-3xl lg:text-4xl opacity-30"
        >
          🎂
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, -15, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 text-xl sm:text-2xl lg:text-3xl opacity-30"
        >
          🎉
        </motion.div>
      </>
    )}
    
    {templateId === 'graduation' && (
      <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Floating graduation elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-5 sm:top-10 left-10 sm:left-20 text-3xl sm:text-4xl lg:text-6xl opacity-20"
        >
          🎓
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -15, 15, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-10 sm:top-20 right-8 sm:right-16 text-2xl sm:text-3xl lg:text-5xl opacity-20"
        >
          📜
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            x: [0, 10, 0],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-8 sm:bottom-16 left-8 sm:left-16 text-2xl sm:text-3xl lg:text-4xl opacity-20"
        >
          🌟
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -12, 12, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 text-2xl sm:text-3xl lg:text-5xl opacity-20"
        >
          🎊
        </motion.div>
        
        {/* Main content */}
        <div className="text-center relative z-10 w-full max-w-4xl">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1.5, type: "spring", stiffness: 80 }}
            className="mb-8 sm:mb-12"
          >
            <motion.h1 
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  "0 8px 25px rgba(0,0,0,0.15)",
                  "0 0 0px rgba(0,0,0,0)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black mb-4 sm:mb-6 font-jakarta leading-none"
            >
              {slideData.title}
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
              className="h-0.5 sm:h-1 bg-gradient-to-r from-green-400 via-black to-green-400 mx-auto rounded-full"
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.5, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.03, 1],
                letterSpacing: ["0em", "0.02em", "0em"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black font-jakarta leading-tight"
            >
              {content}
            </motion.div>
            
            {/* Decorative elements around name */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -top-3 sm:-top-6 -left-3 sm:-left-6 w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 border-2 sm:border-3 border-green-400 rounded-full opacity-30"
            />
            <motion.div
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-3 sm:-bottom-6 -right-3 sm:-right-6 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 bg-green-400 rounded-full opacity-30"
            />
          </motion.div>
          
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-light mt-6 sm:mt-8 tracking-wide"
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Future Leader
            </motion.span>
          </motion.p>
        </div>
      </div>
    )}
    
    {templateId !== 'birthday' && templateId !== 'graduation' && (
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 sm:mb-8 font-jakarta leading-none"
        >
          {slideData.title}
        </motion.h1>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black font-jakarta leading-tight"
        >
          {content}
        </motion.div>
      </div>
    )}
  </div>
)

export const PhotoSlide = ({ slideData, templateId, photo, photo2, isPhoto2 = false }) => {
  const currentPhoto = isPhoto2 ? photo2 : photo
  
  if (templateId === 'graduation') {
    return (
      <div className="min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
        {/* Floating academic elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 sm:top-16 left-8 sm:left-16 text-2xl sm:text-3xl lg:text-4xl opacity-15"
        >
          📚
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -8, 8, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-10 sm:top-20 right-10 sm:right-20 text-xl sm:text-2xl lg:text-3xl opacity-15"
        >
          ✏️
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 text-2xl sm:text-3xl lg:text-4xl opacity-15"
        >
          🏆
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Text Section */}
          <motion.div 
            initial={{ x: -100, opacity: 0, rotate: -3 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1.2, type: "spring", stiffness: 80 }}
            className="text-left relative order-2 lg:order-1"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 sm:mb-8 font-jakarta leading-tight"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="bg-gradient-to-r from-black via-green-600 to-black bg-clip-text text-transparent bg-[length:200%_100%]"
                >
                  {slideData.title}
                </motion.span>
              </motion.h2>
              
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80%", opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                className="h-0.5 sm:h-1 bg-gradient-to-r from-green-400 via-black to-transparent rounded-full mb-6 sm:mb-8"
              />
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-light leading-relaxed"
              >
                <motion.span
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {slideData.subtitle}
                </motion.span>
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Photo Section */}
          <motion.div 
            initial={{ x: 100, opacity: 0, scale: 0.8, rotate: 3 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 1.5, type: "spring", stiffness: 80 }}
            className="flex justify-center relative order-1 lg:order-2"
          >
            {currentPhoto && (
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="relative group"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 25px 50px rgba(76, 175, 80, 0.15)",
                      "0 35px 70px rgba(76, 175, 80, 0.25)",
                      "0 25px 50px rgba(76, 175, 80, 0.15)"
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border-3 sm:border-4 border-green-400 relative bg-gradient-to-br from-green-50 to-white"
                >
                  <img 
                    src={currentPhoto} 
                    alt="Graduate" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-green-900/10"
                  />
                  
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 text-2xl sm:text-3xl lg:text-4xl"
                  >
                    🎓
                  </motion.div>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 border-2 sm:border-3 border-green-300 rounded-full opacity-30"
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 w-6 sm:w-10 lg:w-12 h-6 sm:h-10 lg:h-12 bg-green-300 rounded-full opacity-30"
                />
                
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.sin(i) * 20, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                    className="absolute text-lg sm:text-xl lg:text-2xl pointer-events-none"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`
                    }}
                  >
                    ⭐
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    )
  }
  
  if (templateId === 'birthday' && !isPhoto2) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[60vh] sm:min-h-[70vh] px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ x: -100, opacity: 0, rotate: -5 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 1, type: "spring" }}
          className="text-left relative order-2 lg:order-1"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
              y: [0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4 sm:mb-6 font-jakarta leading-tight">
              {slideData.title}
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.5 }}
              className="h-0.5 sm:h-1 bg-gradient-to-r from-black to-gray-400 rounded-full mb-6 sm:mb-8"
            />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-light italic leading-relaxed"
            >
              {slideData.subtitle}
            </motion.p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 100, opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, duration: 1.2, type: "spring" }}
          className="flex justify-center relative order-1 lg:order-2"
        >
          {currentPhoto && (
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative group"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 20px 40px rgba(0,0,0,0.1)",
                    "0 30px 60px rgba(0,0,0,0.2)",
                    "0 20px 40px rgba(0,0,0,0.1)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border-3 sm:border-4 border-black relative"
              >
                <img 
                  src={currentPhoto} 
                  alt="Memory" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8">
      <motion.h2 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-light text-black mb-6 sm:mb-8 font-jakarta"
      >
        {slideData.title}
      </motion.h2>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center mb-6 sm:mb-8"
      >
        {currentPhoto && (
          <div className="w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-3 sm:border-4 border-black">
            <img 
              src={currentPhoto} 
              alt="Memory" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </motion.div>
      <motion.p 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light italic"
      >
        {slideData.subtitle}
      </motion.p>
    </div>
  )
}

export const HeartfeltSlide = ({ slideData, templateId }) => {
  if (templateId === 'graduation') {
    return (
      <div className="min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
        {/* Inspirational floating elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 sm:top-16 left-8 sm:left-16 text-3xl sm:text-4xl lg:text-5xl opacity-15"
        >
          💡
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-10 sm:top-20 right-10 sm:right-20 text-2xl sm:text-3xl lg:text-4xl opacity-15"
        >
          🚀
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 15, 0],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-8 sm:bottom-16 left-10 sm:left-20 text-2xl sm:text-3xl lg:text-4xl opacity-15"
        >
          🌟
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -35, 0],
            rotate: [0, -12, 12, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-10 sm:bottom-20 right-8 sm:right-16 text-3xl sm:text-4xl lg:text-5xl opacity-15"
        >
          🎯
        </motion.div>
        
        <div className="text-center max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2, type: "spring", stiffness: 80 }}
          >
            <motion.h1 
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-black mb-12 sm:mb-16 font-jakarta leading-tight"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="bg-gradient-to-r from-black via-green-600 via-black to-green-600 bg-clip-text text-transparent bg-[length:300%_100%]"
              >
                {slideData.title}
              </motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "50%", opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              className="h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mb-12 sm:mb-16"
            />
            
            <motion.p 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 font-light leading-relaxed"
            >
              <motion.span
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.01, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {slideData.subtitle}
              </motion.span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black mb-8 sm:mb-12 font-jakarta leading-tight"
      >
        {slideData.title}
      </motion.h1>
      <motion.p 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 font-light italic"
      >
        {slideData.subtitle}
      </motion.p>
    </div>
  )
}

export const AgeSlide = ({ slideData, content }) => (
  <div className="text-center relative">
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 opacity-5"
    >
      <div className="w-full h-full border-4 border-black rounded-full" />
    </motion.div>
    
    <motion.h2 
      initial={{ y: -50, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 1, type: "spring" }}
      className="text-5xl font-light text-gray-600 mb-12 font-jakarta relative z-10"
    >
      <motion.span
        animate={{ 
          textShadow: [
            "0 0 0px rgba(0,0,0,0)",
            "0 2px 8px rgba(0,0,0,0.1)",
            "0 0 0px rgba(0,0,0,0)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {slideData.title}
      </motion.span>
    </motion.h2>
    
    <motion.div 
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.6, duration: 1.5, type: "spring", stiffness: 80 }}
      className="relative z-10 mb-8"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          textShadow: [
            "0 10px 30px rgba(0,0,0,0.1)",
            "0 20px 50px rgba(0,0,0,0.2)",
            "0 10px 30px rgba(0,0,0,0.1)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-9xl font-bold text-black font-jakarta inline-block"
      >
        {content}
      </motion.div>
      
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute -top-8 -right-8 w-16 h-16 border-2 border-gray-300 rounded-full opacity-30"
      />
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-8 -left-8 w-12 h-12 bg-gray-200 rounded-full opacity-20"
      />
    </motion.div>
    
    <motion.p 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="text-3xl text-gray-600 font-light relative z-10"
    >
      <motion.span
        animate={{ letterSpacing: ["0em", "0.1em", "0em"] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        Years of Amazing
      </motion.span>
    </motion.p>
    
    <motion.div
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 10, 0]
      }}
      transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      className="absolute top-16 right-16 text-5xl opacity-20"
    >
      🎈
    </motion.div>
    <motion.div
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, -8, 0]
      }}
      transition={{ duration: 5, repeat: Infinity, delay: 3 }}
      className="absolute bottom-16 left-16 text-4xl opacity-20"
    >
      🎂
    </motion.div>
  </div>
)

export const WishSlide = ({ slideData, content, templateId }) => {
  if (templateId === 'graduation') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center relative">
        {/* Achievement floating elements */}
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, 12, -12, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-20 text-4xl opacity-15"
        >
          🏅
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -8, 8, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-16 text-5xl opacity-15"
        >
          🎆
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 10, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-16 left-16 text-4xl opacity-15"
        >
          🎖️
        </motion.div>
        
        <div className="text-center max-w-5xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 80 }}
          >
            <motion.h2 
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl font-light text-gray-600 mb-16 tracking-wider font-jakarta"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="bg-gradient-to-r from-gray-600 via-green-500 to-gray-600 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                {slideData.title}
              </motion.span>
            </motion.h2>
            
            <motion.div 
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="relative"
            >
              {/* Decorative quote marks with graduation theme */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-12 -left-12 text-8xl text-green-300 font-serif"
              >
                “
              </motion.div>
              
              <motion.p 
                animate={{ 
                  scale: [1, 1.005, 1]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="text-4xl text-black font-light leading-relaxed px-16 relative z-10"
              >
                <motion.span
                  animate={{ opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {content || 'Congratulations on your graduation! We are so proud of you!'}
                </motion.span>
              </motion.p>
              
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-12 -right-12 text-8xl text-green-300 font-serif"
              >
                ”
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Floating success particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.sin(i * 2) * 30, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
              className="absolute text-3xl pointer-events-none"
              style={{
                left: `${25 + i * 15}%`,
                top: `${40 + (i % 2) * 20}%`
              }}
            >
              🎉
            </motion.div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className="text-center max-w-4xl mx-auto">
      <motion.h2 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-5xl font-light text-gray-600 mb-16 tracking-wider"
      >
        {slideData.title}
      </motion.h2>
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative"
      >
        <div className="absolute -top-8 -left-8 text-6xl text-gray-300 font-serif">“</div>
        <p className="text-4xl text-black font-light leading-relaxed italic px-16">
          {content || 'May all your dreams come true on this special day!'}
        </p>
        <div className="absolute -bottom-8 -right-8 text-6xl text-gray-300 font-serif">”</div>
      </motion.div>
    </div>
  )
}

export const DurationSlide = ({ slideData, content }) => (
  <div className="text-center">
    <motion.h2 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-5xl font-light text-gray-600 mb-12 font-jakarta"
    >
      {slideData.title}
    </motion.h2>
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
      className="text-8xl font-bold text-black font-jakarta mb-8"
    >
      {content}
    </motion.div>
    <motion.p 
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="text-3xl text-gray-600 font-light"
    >
      Of Beautiful Love
    </motion.p>
  </div>
)