import { useState, useEffect, useRef } from 'react'
import { templateConfigs } from './templateConfigs'
import { useAudio, useSlideNavigation, useLottie } from './hooks'
import SlideRenderer from './SlideRenderer'
import WelcomeScreen from './WelcomeScreen'
import TemplateNotFound from './TemplateNotFound'
import { CardBackground, NavigationControls } from './UtilityComponents'

const FullScreenInteractiveCard = ({ 
  template, 
  recipientName, 
  message, 
  amount, 
  photo, 
  photo2, 
  selectedMusic 
}) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const videoRef = useRef(null)

  const config = templateConfigs[template.id]
  
  if (!config) {
    return <TemplateNotFound template={template} />
  }

  const { audioRef, audioPlaying, toggleAudio, startAudio } = useAudio(selectedMusic, config)
  const { currentSlide, nextSlide, prevSlide } = useSlideNavigation(showContent ? config : { slides: [] })
  const lottieData = useLottie(config.lottieAsset)

  const currentSlideData = config.slides[currentSlide]

  const handleReveal = () => {
    setIsRevealed(true)
    setTimeout(() => {
      setShowContent(true)
      startAudio()
    }, 800)
  }

  // Video background management
  useEffect(() => {
    if (videoRef.current && showContent) {
      videoRef.current.play()
    }
  }, [showContent])

  if (!isRevealed) {
    return (
      <>
        <audio ref={audioRef} loop preload="auto">
          {selectedMusic?.preview_url && (
            <source src={selectedMusic.preview_url} type="audio/mpeg" />
          )}
          <source src={config.music} type="audio/mpeg" />
        </audio>
        <WelcomeScreen onReveal={handleReveal} />
      </>
    )
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-white">
      <audio ref={audioRef} loop preload="auto">
        {selectedMusic?.preview_url && (
          <source src={selectedMusic.preview_url} type="audio/mpeg" />
        )}
        <source src={config.music} type="audio/mpeg" />
      </audio>

      <CardBackground 
        config={config}
        lottieData={lottieData}
        videoRef={videoRef}
        template={template}
      />

      <SlideRenderer
        currentSlide={currentSlide}
        config={config}
        template={template}
        recipientName={recipientName}
        message={message}
        amount={amount}
        photo={photo}
        photo2={photo2}
        lottieData={lottieData}
      />

      <NavigationControls
        currentSlide={currentSlide}
        config={config}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        audioPlaying={audioPlaying}
        toggleAudio={toggleAudio}
        currentSlideData={currentSlideData}
      />
    </div>
  )
}

export default FullScreenInteractiveCard