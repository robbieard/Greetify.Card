import { database } from '../../lib/database'
import { generateCardId, generateCardUrl } from '../../lib/utils'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      templateId,
      recipientName,
      senderName,
      message,
      photoUrl,
      photo2Url,
      musicTrack
    } = req.body

    // Validate required fields
    if (!templateId || !recipientName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Generate unique card ID
    const cardId = generateCardId()
    
    // Create card in database
    const card = await database.createCard({
      id: cardId,
      templateId,
      recipientName,
      senderName,
      message,
      photoUrl,
      photo2Url,
      musicTrack
    })

    // Generate shareable URL
    const cardUrl = generateCardUrl(cardId)

    res.status(201).json({
      success: true,
      card: {
        id: cardId,
        url: cardUrl,
        ...card
      }
    })
  } catch (error) {
    console.error('Create card error:', error)
    res.status(500).json({ error: 'Failed to create card' })
  }
}