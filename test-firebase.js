import { database } from './src/lib/database.js'
import { generateCardId } from './src/lib/utils.js'

// Test Firebase connection
async function testFirebase() {
  try {
    console.log('🔥 Testing Firebase connection...')
    
    // Create test card
    const testCard = {
      id: generateCardId(),
      templateId: 'birthday',
      recipientName: 'Test User',
      senderName: 'Firebase Test',
      message: 'This is a test card from Firebase!',
      photoUrl: 'https://via.placeholder.com/400x400',
      photo2Url: null,
      musicTrack: {
        name: 'Happy Birthday',
        artist: 'Test Artist',
        preview_url: null
      }
    }
    
    console.log('📝 Creating test card with ID:', testCard.id)
    
    // Save to Firebase
    const result = await database.createCard(testCard)
    console.log('✅ Card created successfully:', result)
    
    // Try to read it back
    console.log('📖 Reading card back from Firebase...')
    const retrievedCard = await database.getCard(testCard.id)
    console.log('✅ Card retrieved:', retrievedCard)
    
    console.log('🎉 Firebase test completed successfully!')
    console.log('🔗 Test card URL: http://localhost:3000/card/' + testCard.id)
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error)
  }
}

testFirebase()