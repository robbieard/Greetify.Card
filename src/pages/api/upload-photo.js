import { uploadToCloudinary } from '../../lib/cloudinary'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    })

    const [fields, files] = await form.parse(req)
    const file = files.photo?.[0]

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Read file and convert to base64
    const fileBuffer = fs.readFileSync(file.filepath)
    const base64File = `data:${file.mimetype};base64,${fileBuffer.toString('base64')}`

    // Upload to Cloudinary
    const result = await uploadToCloudinary(base64File, 'gift-cards')

    // Clean up temp file
    fs.unlinkSync(file.filepath)

    res.status(200).json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed' })
  }
}