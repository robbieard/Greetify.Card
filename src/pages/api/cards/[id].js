import { database } from '../../../lib/database'
import { isValidCardId } from '../../../lib/utils'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate card ID format
    if (!isValidCardId(id)) {
      return res.status(400).json({ error: 'Invalid card ID' })
    }

    // Get card from database
    const card = await database.getCard(id)

    if (!card) {
      return res.status(404).json({ error: 'Card not found' })
    }

    // Increment view count
    await database.incrementViewCount(id)

    res.status(200).json({
      success: true,
      card: {
        ...card,
        musicTrack: card.musicTrack || null
      }
    })
  } catch (error) {
    console.error('Get card error:', error)
    res.status(500).json({ error: 'Failed to get card' })
  }
}