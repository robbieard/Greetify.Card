import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Lottie from 'lottie-react'

// Import Lottie Assets
import birthdayAnim from '../../assets/lottie/birthday.json'
import birthdayGiftAnim from '../../assets/lottie/Birthday Gifts.json'
import weddingBgAnim from '../../assets/lottie/bg-wedding.json'
import weddingRingAnim from '../../assets/lottie/weddingring.json'
import loveAnim from '../../assets/lottie/love.json'
import loveFlowerAnim from '../../assets/lottie/love flower.json'
import graduationAnim from '../../assets/lottie/graduation.json'

const InteractiveCard = ({ template, recipientName, message, amount, photo, photo2, selectedMusic, isFullscreen = false }) => {
  const [stage, setStage] = useState('envelope') // envelope, opening, story, finale
  const [currentSlide, setCurrentSlide] = useState(0)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const audioRef = useRef(null)

  // Premium Template Configurations
  const templateConfig = {
    birthday: {
      theme: 'rose',
      accent: '#e11d48', // Rose 600
      softAccent: '#ffe4e6', // Rose 100
      icon: '🎂',
      music: '/audio/birthday.mp3',
      lottie: { main: birthdayAnim, gift: birthdayGiftAnim },
      slides: [
        { type: 'intro', title: 'A Special Day', subtitle: 'For a very special person...' },
        { type: 'filler', text: 'Today is all about YOU! ✨' },
        { type: 'photo', title: 'Beautiful Moments', image: photo, caption: 'Cherishing every smile', layout: 'polaroid' },
        { type: 'text', title: 'Happy Birthday', content: `Dearest ${recipientName},` },
        { type: 'lottie', animation: birthdayAnim, text: 'Sending you lots of love!' },
        { type: 'text', title: 'My Wish For You', content: message },
        { type: 'photo', title: 'Making Memories', image: photo2, caption: 'Here\'s to many more', layout: 'tape' },
        { type: 'gift', title: 'A Little Gift', content: amount, subtitle: 'Treat yourself to something nice' },
        { type: 'outro', title: 'Enjoy Your Day!', subtitle: 'With love & happiness' }
      ]
    },
    wedding: {
      theme: 'slate',
      accent: '#475569', // Slate 600
      softAccent: '#f1f5f9', // Slate 100
      icon: '💒',
      music: '/audio/wedding.mp3',
      lottie: { main: weddingBgAnim, gift: weddingRingAnim },
      slides: [
        { type: 'intro', title: 'A New Chapter', subtitle: 'Two hearts becoming one...' },
        { type: 'filler', text: 'True love stories never have endings. 💕' },
        { type: 'photo', title: 'The Happy Couple', image: photo, caption: 'Love is in the air', layout: 'polaroid' },
        { type: 'text', title: 'Congratulations', content: `Dear ${recipientName},` },
        { type: 'lottie', animation: weddingRingAnim, text: 'Forever & Always' },
        { type: 'text', title: 'Wedding Wishes', content: message },
        { type: 'photo', title: 'Forever & Always', image: photo2, caption: 'May your love grow stronger', layout: 'tape' },
        { type: 'gift', title: 'Wedding Gift', content: amount, subtitle: 'For your new journey' },
        { type: 'outro', title: 'Happily Ever After', subtitle: 'Best wishes for your future' }
      ]
    },
    anniversary: {
      theme: 'pink',
      accent: '#db2777', // Pink 600
      softAccent: '#fce7f3', // Pink 100
      icon: '💕',
      music: '/audio/romantic.mp3',
      lottie: { main: loveAnim, gift: loveFlowerAnim },
      slides: [
        { type: 'intro', title: 'Celebrating Love', subtitle: 'Another year of togetherness...' },
        { type: 'filler', text: 'You are my favorite notification. 💌' },
        { type: 'photo', title: 'Timeless Love', image: photo, caption: 'Every moment with you is a gift', layout: 'polaroid' },
        { type: 'text', title: 'Happy Anniversary', content: `To ${recipientName},` },
        { type: 'lottie', animation: loveAnim, text: 'My heart beats for you' },
        { type: 'text', title: 'My Vows', content: message },
        { type: 'photo', title: 'Still The One', image: photo2, caption: 'Falling in love all over again', layout: 'tape' },
        { type: 'gift', title: 'For Us', content: amount, subtitle: 'To celebrate our love' },
        { type: 'outro', title: 'Forever Yours', subtitle: 'Here\'s to eternity' }
      ]
    },
    graduation: {
      theme: 'emerald',
      accent: '#059669', // Emerald 600
      softAccent: '#d1fae5', // Emerald 100
      icon: '🎓',
      music: '/audio/celebration.mp3',
      lottie: { main: graduationAnim, gift: graduationAnim },
      slides: [
        { type: 'intro', title: 'Dream Big', subtitle: 'The future belongs to you...' },
        { type: 'filler', text: 'The tassel was worth the hassle! 🎓' },
        { type: 'photo', title: 'The Graduate', image: photo, caption: 'Hard work pays off', layout: 'polaroid' },
        { type: 'text', title: 'Congratulations', content: `Way to go, ${recipientName}!` },
        { type: 'lottie', animation: graduationAnim, text: 'Sky is the limit!' },
        { type: 'text', title: 'Proud Moment', content: message },
        { type: 'photo', title: 'New Horizons', image: photo2, caption: 'Ready to take on the world', layout: 'tape' },
        { type: 'gift', title: 'Graduation Gift', content: amount, subtitle: 'A small reward for a big achievement' },
        { type: 'outro', title: 'The Adventure Begins', subtitle: 'Go change the world!' }
      ]
    }
  }

  const config = templateConfig[template.id] || templateConfig.birthday
  const slides = config.slides

  const audioSrc = selectedMusic?.preview_url || config.music

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      setAudioPlaying(false)
    }
  }, [audioSrc])

  // Audio Control
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause()
        setAudioPlaying(false)
      } else {
        audioRef.current.play()
        setAudioPlaying(true)
      }
    }
  }

  // Auto-advance slides
  useEffect(() => {
    if (stage === 'story' && !isPaused && currentSlide < slides.length) {
      const timer = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        } else {
          setStage('finale')
        }
      }, 6000) // Increased to 6 seconds for better reading time
      return () => clearTimeout(timer)
    }
  }, [stage, currentSlide, isPaused, slides.length])

  const handleOpenEnvelope = () => {
    setStage('opening')
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked', e))
      setAudioPlaying(true)
    }
    setTimeout(() => setStage('story'), 2000)
  }

  // --- RENDERERS ---

  // 1. Envelope Scene
  if (stage === 'envelope' || stage === 'opening') {
    return (
      <div className={`relative flex items-center justify-center bg-gray-50 overflow-hidden ${isFullscreen ? 'w-screen h-screen fixed inset-0 z-50' : 'w-full h-96 rounded-3xl'}`}>
        <motion.div
          className="relative z-10 cursor-pointer"
          onClick={handleOpenEnvelope}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Envelope Body */}
          <motion.div
            className="w-72 h-52 bg-white shadow-2xl rounded-lg relative overflow-hidden flex items-center justify-center"
            animate={stage === 'opening' ? { rotateX: -180, opacity: 0, y: 100 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 border-4 border-double border-gray-100 m-2"></div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-2">
                <Lottie animationData={config.lottie.main} loop={true} />
              </div>
              <div className="font-jakarta font-bold text-gray-800 text-sm tracking-widest uppercase">
                For {recipientName}
              </div>
              <div className="text-xs text-gray-400 mt-1 font-poppins">Tap to Open</div>
            </div>

            {/* Wax Seal */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-800 rounded-full flex items-center justify-center shadow-lg border-4 border-red-900/20 opacity-20">
            </div>
          </motion.div>
        </motion.div>

        {/* Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: config.softAccent,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  // 2. Story Experience
  return (
    <div className={`relative bg-white overflow-hidden flex flex-col ${isFullscreen ? 'w-screen h-screen fixed inset-0 z-50' : 'w-full h-[600px] rounded-3xl shadow-2xl'}`}>
      <audio ref={audioRef} loop preload="auto">
        <source src={audioSrc} type="audio/mpeg" />
      </audio>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-2">
        {slides.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundColor: config.accent }}
              initial={{ width: '0%' }}
              animate={{
                width: idx < currentSlide ? '100%' :
                  idx === currentSlide ? '100%' : '0%'
              }}
              transition={idx === currentSlide ? { duration: 6, ease: "linear" } : { duration: 0 }}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-4 z-50 flex gap-4">
        <button onClick={toggleAudio} className="p-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors">
          {audioPlaying ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 relative"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Slide Content Switcher */}
            {slides[currentSlide].type === 'intro' && (
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="w-40 h-40 mx-auto"
                >
                  <Lottie animationData={config.lottie.main} loop={true} />
                </motion.div>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-4xl font-bold font-jakarta text-gray-900"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                  className="text-xl text-gray-500 font-poppins font-light"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              </div>
            )}

            {slides[currentSlide].type === 'filler' && (
              <div className="flex flex-col items-center justify-center h-full max-w-xs mx-auto">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                  className="text-6xl mb-6"
                >
                  ✨
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-poppins font-light italic leading-relaxed text-gray-800"
                >
                  "{slides[currentSlide].text}"
                </motion.h2>
              </div>
            )}

            {slides[currentSlide].type === 'lottie' && (
              <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="w-64 h-64"
                >
                  <Lottie animationData={slides[currentSlide].animation} loop={true} />
                </motion.div>
                <motion.p
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                  className="text-xl font-jakarta font-medium text-gray-600 mt-8"
                >
                  {slides[currentSlide].text}
                </motion.p>
              </div>
            )}

            {slides[currentSlide].type === 'photo' && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <motion.div
                  className={`relative w-full max-w-md aspect-[4/5] bg-white shadow-xl mb-6 p-3 ${slides[currentSlide].layout === 'polaroid' ? 'pb-12 rotate-2' :
                    slides[currentSlide].layout === 'tape' ? '-rotate-1' : ''
                    }`}
                  initial={{ y: 50, opacity: 0, rotate: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    rotate: slides[currentSlide].layout === 'polaroid' ? 2 : slides[currentSlide].layout === 'tape' ? -1 : 0
                  }}
                >
                  {/* Tape Effect */}
                  {slides[currentSlide].layout === 'tape' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm rotate-1 z-10"></div>
                  )}

                  <div className="w-full h-full overflow-hidden bg-gray-100">
                    {slides[currentSlide].image ? (
                      <motion.img
                        src={slides[currentSlide].image}
                        className="w-full h-full object-cover"
                        animate={{ scale: [1, 1.1] }}
                        transition={{ duration: 10 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">No Photo</div>
                    )}
                  </div>

                  {slides[currentSlide].layout === 'polaroid' && (
                    <div className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-gray-600 text-sm">
                      {slides[currentSlide].caption}
                    </div>
                  )}
                </motion.div>

                {slides[currentSlide].layout !== 'polaroid' && (
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="text-lg font-poppins italic text-gray-600"
                  >
                    {slides[currentSlide].caption}
                  </motion.p>
                )}
              </div>
            )}

            {slides[currentSlide].type === 'text' && (
              <div className="max-w-lg mx-auto space-y-8 relative">
                {/* Decorative Quotes */}
                <div className="absolute -top-10 -left-4 text-6xl text-gray-100 font-serif">"</div>

                <motion.h2
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-sm font-bold tracking-widest uppercase text-gray-400 font-jakarta"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                <motion.div
                  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-poppins leading-relaxed text-gray-800"
                >
                  {slides[currentSlide].content}
                </motion.div>

                <div className="absolute -bottom-10 -right-4 text-6xl text-gray-100 font-serif rotate-180">"</div>
              </div>
            )}

            {slides[currentSlide].type === 'gift' && (
              <div className="space-y-8">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 1.5 }}
                  className="w-48 h-48 mx-auto"
                >
                  <Lottie animationData={config.lottie.gift} loop={true} />
                </motion.div>
                <div>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-5xl font-bold font-jakarta mb-2"
                    style={{ color: config.accent }}
                  >
                    {slides[currentSlide].content}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="text-gray-500 font-poppins"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                </div>
              </div>
            )}

            {slides[currentSlide].type === 'outro' && (
              <div className="space-y-6">
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-bold font-jakarta text-gray-900"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-xl text-gray-500 font-poppins"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                  className="pt-8"
                >
                  <a href="/" className="px-8 py-4 rounded-full bg-black text-white text-base font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Create Your Own Card ✨
                  </a>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Areas (Invisible) */}
      <div className="absolute inset-y-0 left-0 w-1/3 z-40" onClick={() => setCurrentSlide(p => Math.max(0, p - 1))} />
      <div className="absolute inset-y-0 right-0 w-1/3 z-40" onClick={() => setCurrentSlide(p => Math.min(slides.length - 1, p + 1))} />
    </div>
  )
}

export default InteractiveCard