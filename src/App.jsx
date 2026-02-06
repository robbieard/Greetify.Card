import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GiftCard from './components/GiftCard'
import LandingPage from './components/LandingPage'
import SharedCard from './components/SharedCard'
import MusicSelector from './components/MusicSelector'

const templates = [
  { id: 'birthday', name: 'Birthday', colors: ['#ff006e', '#8338ec'] },
  { id: 'wedding', name: 'Wedding', colors: ['#ff69b4', '#ff1493'] },
  { id: 'anniversary', name: 'Anniversary', colors: ['#ff4081', '#e91e63'] },
  { id: 'graduation', name: 'Graduation', colors: ['#4caf50', '#2e7d32'] },
]

function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [recipientName, setRecipientName] = useState('')
  const [message, setMessage] = useState('')
  const [amount, setAmount] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photo2, setPhoto2] = useState(null)
  const [wishText, setWishText] = useState('')
  const [relationshipDuration, setRelationshipDuration] = useState('')
  const [durationType, setDurationType] = useState('years')
  const [generatedCard, setGeneratedCard] = useState(null)
  const [shareLink, setShareLink] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [selectedMusic, setSelectedMusic] = useState(null)
  const [showTrakteer, setShowTrakteer] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const missingFields = useMemo(() => {
    const missing = []
    const isBlank = (v) => !String(v ?? '').trim()

    if (isBlank(recipientName)) missing.push('Name')
    if (!selectedMusic) missing.push('Music')

    if (selectedTemplate.id === 'anniversary') {
      if (isBlank(relationshipDuration)) missing.push('Duration')
      if (!photo) missing.push('First photo')
      if (!photo2) missing.push('Second photo')
      if (isBlank(wishText)) missing.push('Wishes')
      return missing
    }

    if (selectedTemplate.id === 'wedding') {
      if (!photo) missing.push('First photo')
      if (!photo2) missing.push('Second photo')
      if (isBlank(wishText)) missing.push('Wishes')
      return missing
    }

    if (selectedTemplate.id === 'birthday') {
      if (isBlank(amount)) missing.push('Age')
      if (!photo) missing.push('First photo')
      if (!photo2) missing.push('Second photo')
      if (isBlank(wishText)) missing.push('Wish')
      return missing
    }

    if (selectedTemplate.id === 'graduation') {
      if (!photo) missing.push('Photo')
      if (isBlank(message)) missing.push('Message')
      return missing
    }

    if (!photo) missing.push('Photo')
    if (isBlank(message)) missing.push('Message')
    if (isBlank(amount)) missing.push('Amount')
    return missing
  }, [amount, message, photo, photo2, recipientName, relationshipDuration, selectedMusic, selectedTemplate.id, wishText])

  const isFormValid = missingFields.length === 0

  useEffect(() => {
    if (validationMessage && isFormValid) setValidationMessage('')
  }, [isFormValid, validationMessage])

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setPhoto(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handlePhoto2Upload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setPhoto2(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!isFormValid) {
      setValidationMessage(`Please complete: ${missingFields.join(', ')}`)
      return
    }

    if (isGenerating) return
    setIsGenerating(true)

    try {
      // Import Firebase functions directly
      const { db } = await import('./lib/firebase')
      const { doc, setDoc } = await import('firebase/firestore')
      const { nanoid } = await import('nanoid')
      const { uploadImage } = await import('./lib/cloudinary-client')

      // Generate unique card ID
      const cardId = nanoid(12)

      console.log('Starting image uploads...')

      // Upload images to Cloudinary
      let photoUrl = null
      let photo2Url = null

      // We need the actual File objects, but currently state has base64
      // We need to modify the state to store File objects or handle base64 upload
      // Cloudinary supports base64 upload if it's a data URI

      if (photo) {
        console.log('Uploading photo 1...')
        photoUrl = await uploadImage(photo)
      }

      if (photo2) {
        console.log('Uploading photo 2...')
        photo2Url = await uploadImage(photo2)
      }

      console.log('Images uploaded:', { photoUrl, photo2Url })

      // Create card data
      const cardData = {
        id: cardId,
        templateId: selectedTemplate.id,
        recipientName: recipientName || 'Your Name',
        senderName: 'Anonymous',
        message: (selectedTemplate.id === 'birthday' || selectedTemplate.id === 'wedding' || selectedTemplate.id === 'anniversary') ? wishText : (message || (selectedTemplate.id === 'graduation' ? 'Congratulations on your graduation! We are so proud of you!' : 'Happy Birthday! Hope your day is amazing!')),
        photoUrl: photoUrl,
        photo2Url: photo2Url,
        musicTrack: selectedMusic,
        createdAt: new Date(),
        expiresAt: null,
        isPaid: false,
        viewCount: 0
      }

      console.log('Creating card with ID:', cardId)

      // Save directly to Firebase from frontend
      await setDoc(doc(db, 'cards', cardId), cardData)

      console.log('Card saved to Firebase successfully!')

      // Generate shareable URL
      const baseUrl = window.location.origin
      const cardUrl = `${baseUrl}/card/${cardId}`

      setGeneratedCard({
        ...cardData,
        template: selectedTemplate,
        amount: selectedTemplate.id === 'anniversary' ? `${relationshipDuration} ${durationType}` : (amount || (selectedTemplate.id === 'birthday' ? '25' : '$100')),
        photo: photoUrl, // Use the URL for display
        photo2: photo2Url,
        url: cardUrl
      })
      setShareLink(cardUrl)
      setCurrentPage('card-view')

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } catch (error) {
      console.error('Error:', error)
      alert('Error creating card: ' + error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentPage('generator')} />
  }

  if (currentPage === 'card-view' && generatedCard) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="text-center max-w-4xl w-full">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setCurrentPage('generator')}
            className="mb-6 sm:mb-8 px-4 py-2 text-black hover:text-gray-600 transition-colors flex items-center gap-2 font-medium mx-auto text-sm sm:text-base"
          >
            ← Create Another Card
          </motion.button>

          <div className="card-responsive">
            <GiftCard
              template={generatedCard.template}
              recipientName={generatedCard.recipientName}
              message={generatedCard.message}
              amount={generatedCard.amount}
              photo={generatedCard.photo}
              photo2={generatedCard.photo2}
              selectedMusic={generatedCard.selectedMusic}
              isInteractive={true}
            />
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 sm:mt-12 space-y-4 sm:space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 font-jakarta">
                Your Card is Ready!
              </h3>
              <p className="text-gray-600 font-poppins text-sm sm:text-base">
                Share this magical experience with your loved one
              </p>
            </div>

            <motion.div
              className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200"
              whileHover={{ scale: 1.02 }}
            >
              <label className="block text-black font-medium mb-3 text-xs sm:text-sm uppercase tracking-wider">
                Shareable Link
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 p-3 sm:p-4 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
                />
                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 sm:px-6 py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${copySuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                  {copySuccess ? '✓ Copied!' : 'Copy Link'}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-left">
                  <div className="text-sm sm:text-base font-semibold text-black font-jakarta">
                    Support this project
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-poppins mt-1">
                    If this card made someone smile, you can send a tip via Trakteer.
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => window.open('https://trakteer.id/b2n2/tip', '_blank')}
                    className="px-4 sm:px-5 py-3 rounded-lg sm:rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base w-full sm:w-auto"
                  >
                    Open Trakteer
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowTrakteer(true)}
                    className="px-4 sm:px-5 py-3 rounded-lg sm:rounded-xl bg-gray-100 text-black font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base w-full sm:w-auto"
                  >
                    Details
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`https://wa.me/?text=I've created a special gift card for you! ${shareLink}`, '_blank')}
                className="px-4 sm:px-6 py-3 bg-green-500 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm sm:text-base"
              >
                Share on WhatsApp
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=I've created a special gift card for you! ${shareLink}`, '_blank')}
                className="px-4 sm:px-6 py-3 bg-blue-500 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-blue-600 transition-colors text-sm sm:text-base"
              >
                Share on Twitter
              </motion.button>
            </div>

            <motion.div
              className="text-center p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-blue-800 font-medium text-xs sm:text-sm">
                This link will work forever. Your recipient can view the interactive card anytime.
              </p>
            </motion.div>

            <AnimatePresence>
              {showTrakteer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[999] flex items-center justify-center p-4"
                  onClick={() => setShowTrakteer(false)}
                >
                  <div className="absolute inset-0 bg-black/50" />
                  <motion.div
                    initial={{ y: 20, scale: 0.98, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    exit={{ y: 20, scale: 0.98, opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="relative w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-2xl p-5 sm:p-6 text-left"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base sm:text-lg font-bold text-black font-jakarta">Support via Trakteer</div>
                        <div className="text-xs sm:text-sm text-gray-600 font-poppins mt-1">
                          Your tip helps me keep improving this product.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowTrakteer(false)}
                        className="px-3 py-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition-colors text-sm"
                      >
                        Close
                      </button>
                    </div>

                    <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="text-xs sm:text-sm text-gray-700 font-poppins">
                        Link
                      </div>
                      <div className="mt-2 font-mono text-xs sm:text-sm break-all text-black">
                        https://trakteer.id/b2n2/tip
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => window.open('https://trakteer.id/b2n2/tip', '_blank')}
                        className="flex-1 px-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
                      >
                        Open Trakteer
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText('https://trakteer.id/b2n2/tip')
                          } catch (err) {
                            console.error('Failed to copy:', err)
                          }
                        }}
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-black font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base"
                      >
                        Copy Link
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        onClick={() => setCurrentPage('landing')}
        className="mb-6 sm:mb-8 px-4 py-2 text-black hover:text-gray-600 transition-all duration-300 flex items-center gap-2 sm:gap-3 font-medium group text-sm sm:text-base"
      >
        <motion.span
          animate={{ x: [-2, 0, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ←
        </motion.span>
        <span className="group-hover:underline">Back to Home</span>
      </motion.button>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.h1
            className="text-responsive-lg font-bold text-black mb-4 font-jakarta"
          >
            Create Your
            <motion.span
              className="block text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Gift Card
            </motion.span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-1 bg-black mx-auto rounded-full"
          />
        </motion.div>

        <div className="space-y-6 lg:space-y-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-black rounded-full"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-black font-jakarta">Choose Template</h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {templates.map((template, index) => (
                  <motion.button
                    key={template.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      x: 10,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTemplate(template)}
                    className={`group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl font-medium transition-all duration-500 overflow-hidden ${selectedTemplate.id === template.id
                        ? 'bg-black text-white shadow-2xl'
                        : 'bg-white text-black hover:bg-gray-50 border-2 border-gray-100 hover:border-gray-200'
                      }`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10"
                      style={{
                        background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})`
                      }}
                      whileHover={{ opacity: 0.1 }}
                    />

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div
                          className="w-10 h-10 rounded-xl"
                          style={{ background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})` }}
                        />
                        <span className="font-jakarta font-semibold text-sm sm:text-base">
                          {template.name}
                        </span>
                      </div>

                      <motion.div
                        animate={selectedTemplate.id === template.id ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full border-2 ${selectedTemplate.id === template.id
                            ? 'bg-white border-white'
                            : 'border-gray-300'
                          }`}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-6 sm:space-y-8 pb-6 sm:pb-8"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-black rounded-full"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-black font-jakarta">Personalize</h3>
              </div>

              {/* Anniversary specific inputs */}
              {selectedTemplate.id === 'anniversary' && (
                <>
                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Couple Names</label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="input-responsive bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 font-poppins"
                        placeholder="John & Jane, Alex & Sarah..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: recipientName ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Relationship Duration</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <motion.input
                          type="number"
                          value={relationshipDuration}
                          onChange={(e) => setRelationshipDuration(e.target.value)}
                          whileFocus={{ scale: 1.02 }}
                          className="input-responsive bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 font-poppins text-base sm:text-lg"
                          placeholder="2"
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-black"
                          initial={{ width: 0 }}
                          animate={{ width: relationshipDuration ? '100%' : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <motion.select
                        value={durationType}
                        onChange={(e) => setDurationType(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="input-responsive bg-white text-black border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 font-poppins"
                      >
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                      </motion.select>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">First Love Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="anniversary-photo1-upload"
                      />
                      <motion.label
                        htmlFor="anniversary-photo1-upload"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-3 group"
                      >
                        {photo ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-3 sm:gap-4"
                          >
                            <motion.img
                              src={photo}
                              alt="Preview"
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="text-left">
                              <div className="font-semibold text-black text-sm sm:text-base">Beautiful love story uploaded</div>
                              <div className="text-xs sm:text-sm text-gray-500">Click to change</div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="text-center">
                            <div className="font-semibold text-black group-hover:text-gray-700 text-sm sm:text-base">Upload First Photo</div>
                            <div className="text-xs sm:text-sm text-gray-500">A special love moment</div>
                          </div>
                        )}
                      </motion.label>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Second Love Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto2Upload}
                        className="hidden"
                        id="anniversary-photo2-upload"
                      />
                      <motion.label
                        htmlFor="anniversary-photo2-upload"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-3 group"
                      >
                        {photo2 ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-3 sm:gap-4"
                          >
                            <motion.img
                              src={photo2}
                              alt="Preview"
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="text-left">
                              <div className="font-semibold text-black text-sm sm:text-base">Another beautiful moment</div>
                              <div className="text-xs sm:text-sm text-gray-500">Click to change</div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="text-center">
                            <div className="font-semibold text-black group-hover:text-gray-700 text-sm sm:text-base">Upload Second Photo</div>
                            <div className="text-xs sm:text-sm text-gray-500">Another precious moment</div>
                          </div>
                        )}
                      </motion.label>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Anniversary Wishes</label>
                    <div className="relative">
                      <motion.textarea
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 h-24 sm:h-32 resize-none font-poppins text-sm sm:text-base"
                        placeholder="Write your heartfelt anniversary wishes..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: wishText ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <MusicSelector
                    selectedTrack={selectedMusic}
                    onTrackSelect={setSelectedMusic}
                  />
                </>
              )}

              {/* Wedding specific inputs */}
              {selectedTemplate.id === 'wedding' && (
                <>
                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Couple Names</label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="input-responsive bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 font-poppins"
                        placeholder="John & Jane, Alex & Sarah..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: recipientName ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">First Wedding Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="wedding-photo1-upload"
                      />
                      <motion.label
                        htmlFor="wedding-photo1-upload"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-3 group"
                      >
                        {photo ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-3 sm:gap-4"
                          >
                            <motion.img
                              src={photo}
                              alt="Preview"
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="text-left">
                              <div className="font-semibold text-black text-sm sm:text-base">Beautiful couple uploaded</div>
                              <div className="text-xs sm:text-sm text-gray-500">Click to change</div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="text-center">
                            <div className="font-semibold text-black group-hover:text-gray-700 text-sm sm:text-base">Upload First Photo</div>
                            <div className="text-xs sm:text-sm text-gray-500">A special wedding moment</div>
                          </div>
                        )}
                      </motion.label>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Second Wedding Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto2Upload}
                        className="hidden"
                        id="wedding-photo2-upload"
                      />
                      <motion.label
                        htmlFor="wedding-photo2-upload"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-3 group"
                      >
                        {photo2 ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-3 sm:gap-4"
                          >
                            <motion.img
                              src={photo2}
                              alt="Preview"
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="text-left">
                              <div className="font-semibold text-black text-sm sm:text-base">Another beautiful moment</div>
                              <div className="text-xs sm:text-sm text-gray-500">Click to change</div>
                            </div>
                          </motion.div>
                        ) : (
                          <>
                            <div className="text-3xl sm:text-4xl"></div>
                            <div className="text-center">
                              <div className="font-semibold text-black group-hover:text-gray-700 text-sm sm:text-base">Upload Second Photo</div>
                              <div className="text-xs sm:text-sm text-gray-500">Another precious moment</div>
                            </div>
                          </>
                        )}
                      </motion.label>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Wedding Wishes</label>
                    <div className="relative">
                      <motion.textarea
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 h-24 sm:h-32 resize-none font-poppins text-sm sm:text-base"
                        placeholder="Write your heartfelt wedding wishes..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: wishText ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <MusicSelector
                    selectedTrack={selectedMusic}
                    onTrackSelect={setSelectedMusic}
                  />
                </>
              )}

              {/* Birthday specific inputs */}
              {selectedTemplate.id === 'birthday' && (
                <>
                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Birthday Person's Name</label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="input-responsive bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 font-poppins"
                        placeholder="Enter their beautiful name..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: recipientName ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Age</label>
                    <div className="relative">
                      <motion.input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="input-responsive bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 font-poppins text-base sm:text-lg"
                        placeholder="How old are they turning?"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: amount ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">First Memory Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo1-upload"
                      />
                      <motion.label
                        htmlFor="photo1-upload"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-3 group"
                      >
                        {photo ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-3 sm:gap-4"
                          >
                            <motion.img
                              src={photo}
                              alt="Preview"
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="text-left">
                              <div className="font-semibold text-black text-sm sm:text-base">Beautiful memory uploaded</div>
                              <div className="text-xs sm:text-sm text-gray-500">Click to change</div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="text-center">
                            <div className="font-semibold text-black group-hover:text-gray-700 text-sm sm:text-base">Upload First Photo</div>
                            <div className="text-xs sm:text-sm text-gray-500">A special moment to remember</div>
                          </div>
                        )}
                      </motion.label>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Second Memory Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto2Upload}
                        className="hidden"
                        id="photo2-upload"
                      />
                      <motion.label
                        htmlFor="photo2-upload"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-3 group"
                      >
                        {photo2 ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-3 sm:gap-4"
                          >
                            <motion.img
                              src={photo2}
                              alt="Preview"
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="text-left">
                              <div className="font-semibold text-black text-sm sm:text-base">Another beautiful memory</div>
                              <div className="text-xs sm:text-sm text-gray-500">Click to change</div>
                            </div>
                          </motion.div>
                        ) : (
                          <>
                            <div className="text-3xl sm:text-4xl"></div>
                            <div className="text-center">
                              <div className="font-semibold text-black group-hover:text-gray-700 text-sm sm:text-base">Upload Second Photo</div>
                              <div className="text-xs sm:text-sm text-gray-500">Another precious moment</div>
                            </div>
                          </>
                        )}
                      </motion.label>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Birthday Wish</label>
                    <div className="relative">
                      <motion.textarea
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 h-24 sm:h-32 resize-none font-poppins text-sm sm:text-base"
                        placeholder="Write your heartfelt birthday wish..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: wishText ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <MusicSelector
                    selectedTrack={selectedMusic}
                    onTrackSelect={setSelectedMusic}
                  />
                </>
              )}

              {/* Graduation specific inputs */}
              {selectedTemplate.id === 'graduation' && (
                <>
                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Graduate's Name</label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="input-responsive bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 font-poppins"
                        placeholder="Enter graduate's name..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: recipientName ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Graduation Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="graduation-photo-upload"
                      />
                      <motion.label
                        htmlFor="graduation-photo-upload"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-3 group"
                      >
                        {photo ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-3 sm:gap-4"
                          >
                            <motion.img
                              src={photo}
                              alt="Preview"
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="text-left">
                              <div className="font-semibold text-black text-sm sm:text-base">Graduation photo uploaded</div>
                              <div className="text-xs sm:text-sm text-gray-500">Click to change</div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="text-center">
                            <div className="font-semibold text-black group-hover:text-gray-700 text-sm sm:text-base">Upload Graduation Photo</div>
                            <div className="text-xs sm:text-sm text-gray-500">A proud graduation moment</div>
                          </div>
                        )}
                      </motion.label>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Congratulations Message</label>
                    <div className="relative">
                      <motion.textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 h-24 sm:h-32 resize-none font-poppins text-sm sm:text-base"
                        placeholder="Write your congratulations message..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: message ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <MusicSelector
                    selectedTrack={selectedMusic}
                    onTrackSelect={setSelectedMusic}
                  />
                </>
              )}

              {/* Other templates - keep existing fields */}
              {selectedTemplate.id !== 'birthday' && selectedTemplate.id !== 'wedding' && selectedTemplate.id !== 'anniversary' && selectedTemplate.id !== 'graduation' && (
                <>
                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Recipient Name</label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="input-responsive bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 font-poppins"
                        placeholder="Enter recipient's name..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: recipientName ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Photo</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <motion.label
                        htmlFor="photo-upload"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-dashed border-gray-200 hover:border-black transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 sm:gap-3 group"
                      >
                        {photo ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-3 sm:gap-4"
                          >
                            <motion.img
                              src={photo}
                              alt="Preview"
                              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                              whileHover={{ scale: 1.1 }}
                            />
                            <div className="text-left">
                              <div className="font-semibold text-black text-sm sm:text-base">Photo uploaded</div>
                              <div className="text-xs sm:text-sm text-gray-500">Click to change</div>
                            </div>
                          </motion.div>
                        ) : (
                          <>
                            <div className="text-3xl sm:text-4xl"></div>
                            <div className="text-center">
                              <div className="font-semibold text-black group-hover:text-gray-700 text-sm sm:text-base">Upload Photo</div>
                              <div className="text-xs sm:text-sm text-gray-500">Drag & drop or click to browse</div>
                            </div>
                          </>
                        )}
                      </motion.label>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Message</label>
                    <div className="relative">
                      <motion.textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 h-24 sm:h-32 resize-none font-poppins text-sm sm:text-base"
                        placeholder="Write your heartfelt message..."
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: message ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="group">
                    <label className="block text-black font-medium mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">Amount</label>
                    <div className="relative">
                      <motion.input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        whileFocus={{ scale: 1.02 }}
                        className="input-responsive bg-white text-black placeholder-gray-400 border-2 border-gray-100 focus:outline-none focus:border-black transition-all duration-300 font-poppins text-base sm:text-lg"
                        placeholder="$100"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{ width: amount ? '100%' : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={(!isFormValid || isGenerating) ? undefined : {
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
              disabled={!isFormValid || isGenerating}
              className={`group relative button-responsive bg-black text-white font-bold transition-all duration-500 font-poppins overflow-hidden ${(!isFormValid || isGenerating) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black"
                initial={{ x: '-100%' }}
                whileHover={(!isFormValid || isGenerating) ? undefined : { x: 0 }}
                transition={{ duration: 0.5 }}
              />

              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                {isGenerating ? 'Generating...' : 'Generate Card'}
              </span>
            </motion.button>

            {validationMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl sm:rounded-2xl border border-red-200 bg-red-50 p-4 text-left"
              >
                <div className="text-sm font-semibold text-red-800 font-jakarta">Incomplete form</div>
                <div className="mt-1 text-xs sm:text-sm text-red-700 font-poppins">{validationMessage}</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/card/:cardId" element={<SharedCard />} />
      </Routes>
    </Router>
  )
}

export default App