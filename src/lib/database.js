import { db } from './firebase'
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, orderBy, query, increment } from 'firebase/firestore'

export const database = {
  // Create new card
  async createCard(cardData) {
    const { id, templateId, recipientName, senderName, message, photoUrl, photo2Url, musicTrack } = cardData
    
    const cardDoc = {
      id,
      templateId,
      recipientName,
      senderName,
      message,
      photoUrl,
      photo2Url,
      musicTrack,
      createdAt: new Date(),
      expiresAt: null,
      isPaid: false,
      viewCount: 0
    }
    
    await setDoc(doc(db, 'cards', id), cardDoc)
    return cardDoc
  },

  // Get card by ID
  async getCard(id) {
    const cardDoc = await getDoc(doc(db, 'cards', id))
    return cardDoc.exists() ? cardDoc.data() : null
  },

  // Update view count
  async incrementViewCount(id) {
    await updateDoc(doc(db, 'cards', id), {
      viewCount: increment(1)
    })
  },

  // Get all cards (for admin)
  async getAllCards() {
    const q = query(collection(db, 'cards'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => doc.data())
  }
}