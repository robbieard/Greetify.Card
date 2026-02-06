import { motion, AnimatePresence } from 'framer-motion'
import { 
  IntroSlide, 
  NameSlide, 
  PhotoSlide, 
  HeartfeltSlide, 
  AgeSlide, 
  WishSlide, 
  DurationSlide 
} from './SlideComponents'
import { FinaleSlide } from './UtilityComponents'

const SlideRenderer = ({ 
  currentSlide, 
  config, 
  template, 
  recipientName, 
  message, 
  amount, 
  photo, 
  photo2, 
  lottieData 
}) => {
  const currentSlideData = config.slides[currentSlide]

  const getSlideContent = (contentKey) => {
    switch (contentKey) {
      case 'recipientName': return recipientName
      case 'message': return message
      case 'amount': return amount
      default: return contentKey
    }
  }

  const renderSlide = () => {
    const slideProps = {
      slideData: currentSlideData,
      templateId: template.id,
      content: getSlideContent(currentSlideData.content)
    }

    switch (currentSlideData.type) {
      case 'intro':
        return <IntroSlide {...slideProps} />
      
      case 'name':
        return <NameSlide {...slideProps} />
      
      case 'photo1':
        return <PhotoSlide {...slideProps} photo={photo} photo2={photo2} />
      
      case 'photo2':
        return <PhotoSlide {...slideProps} photo={photo} photo2={photo2} isPhoto2={true} />
      
      case 'photo':
        return <PhotoSlide {...slideProps} photo={photo} />
      
      case 'heartfelt':
      case 'grateful':
        return <HeartfeltSlide {...slideProps} templateId={template.id} />
      
      case 'age':
        return <AgeSlide {...slideProps} />
      
      case 'wish':
      case 'message':
        return <WishSlide {...slideProps} templateId={template.id} />
      
      case 'duration':
        return <DurationSlide {...slideProps} />
      
      case 'finale':
        return <FinaleSlide slideData={currentSlideData} lottieData={lottieData} templateId={template.id} />
      
      default:
        return <HeartfeltSlide {...slideProps} />
    }
  }

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full max-w-6xl"
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SlideRenderer