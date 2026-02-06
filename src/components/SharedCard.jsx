import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GiftCard from './GiftCard'

function SharedCard() {
  const { cardId } = useParams()
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCard = async () => {
      try {
        console.log('=== SharedCard Debug Start ===')
        console.log('Current URL:', window.location.href)
        console.log('Card ID from params:', cardId)
        console.log('Loading card with ID:', cardId)

        // Test Firebase connection first
        console.log('Testing Firebase connection...')
        const { db } = await import('../lib/firebase')
        console.log('Firebase db imported:', !!db)

        const { doc, getDoc } = await import('firebase/firestore')
        console.log('Firestore functions imported')

        const cardRef = doc(db, 'cards', cardId)
        console.log('Card reference created:', cardRef.path)

        const cardDoc = await getDoc(cardRef)
        console.log('Document fetch completed')
        console.log('Card exists:', cardDoc.exists())

        if (cardDoc.exists()) {
          const cardData = cardDoc.data()
          console.log('Card data retrieved:', cardData)
          console.log('Card template ID:', cardData.templateId)
          console.log('Card recipient:', cardData.recipientName)
          setCard(cardData)
        } else {
          console.log('Card not found in Firebase with ID:', cardId)
          setError('Card not found')
        }
      } catch (err) {
        console.error('=== Firebase Error Details ===')
        console.error('Error type:', err.constructor.name)
        console.error('Error message:', err.message)
        console.error('Error code:', err.code)
        console.error('Full error:', err)
        console.error('=== End Error Details ===')
        setError('Failed to load card: ' + err.message)
      }
      setLoading(false)
      console.log('=== SharedCard Debug End ===')
    }

    if (cardId) {
      console.log('Card ID exists, loading card...')
      loadCard()
    } else {
      console.log('No cardId provided in URL params')
      setError('No card ID')
      setLoading(false)
    }
  }, [cardId])

  console.log('Current state:', { loading, error, card, cardId })

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-black font-medium">Loading card {cardId}...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-6">Card ID: {cardId}</p>
          <a href="/" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">Create New Card</a>
        </div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">No Card Data</h1>
          <a href="/" className="px-6 py-3 bg-black text-white rounded-lg">Create Card</a>
        </div>
      </div>
    )
  }

  const template = {
    id: card.templateId,
    name: card.templateId === 'birthday' ? '🎂 Birthday' :
      card.templateId === 'graduation' ? '🎓 Graduation' :
        card.templateId === 'wedding' ? '💒 Wedding' :
          card.templateId === 'anniversary' ? '💕 Anniversary' : 'Gift Card',
    colors: card.templateId === 'birthday' ? ['#ff006e', '#8338ec'] :
      card.templateId === 'graduation' ? ['#4caf50', '#2e7d32'] :
        card.templateId === 'wedding' ? ['#ff69b4', '#ff1493'] :
          card.templateId === 'anniversary' ? ['#ff4081', '#e91e63'] : ['#333', '#666']
  }

  return (
    <div className="min-h-screen bg-black">
      <GiftCard
        template={template}
        recipientName={card.recipientName}
        message={card.message}
        amount="Special Gift"
        photo={card.photoUrl}
        photo2={card.photo2Url}
        selectedMusic={card.musicTrack}
        isInteractive={true}
      />

      {/* Optional: Floating 'Create Your Own' button for viral loop, but subtle */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="/"
          className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm hover:bg-white/30 transition-all border border-white/30"
        >
          Create Your Own ✨
        </a>
      </div>
    </div>
  )
}

export default SharedCard