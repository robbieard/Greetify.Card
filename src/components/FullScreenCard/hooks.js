import { useState, useEffect, useRef } from 'react'

export const useAudio = (selectedMusic, config) => {
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current && selectedMusic?.preview_url) {
      audioRef.current.src = selectedMusic.preview_url
      audioRef.current.load()
    }
  }, [selectedMusic])

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

  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setAudioPlaying(true)
    }
  }

  return { audioRef, audioPlaying, toggleAudio, startAudio }
}

export const useSlideNavigation = (config) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < config.slides.length - 1) {
      setCurrentSlide(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
    }
  }

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide < config.slides.length - 1) {
        nextSlide()
      }
    }, 4000)
    return () => clearTimeout(timer)
  }, [currentSlide, config.slides.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        prevSlide()
      } else if (e.key === 'ArrowRight' && currentSlide < config.slides.length - 1) {
        nextSlide()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, config.slides.length])

  return { currentSlide, nextSlide, prevSlide }
}

export const useLottie = (lottieAsset) => {
  const [lottieData, setLottieData] = useState(null)

  useEffect(() => {
    const loadLottie = async () => {
      try {
        const response = await fetch(lottieAsset)
        const data = await response.json()
        setLottieData(data)
      } catch (error) {
        console.log('Lottie file not found:', lottieAsset, error)
      }
    }
    if (lottieAsset) loadLottie()
  }, [lottieAsset])

  return lottieData
}