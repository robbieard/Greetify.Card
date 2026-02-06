import { nanoid } from 'nanoid'

// Generate unique card ID (12 characters, URL-safe)
export const generateCardId = () => {
  return nanoid(12)
}

// Generate card URL
export const generateCardUrl = (cardId) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return `${baseUrl}/card/${cardId}`
}

// Validate card ID format
export const isValidCardId = (id) => {
  return typeof id === 'string' && id.length === 12 && /^[A-Za-z0-9_-]+$/.test(id)
}