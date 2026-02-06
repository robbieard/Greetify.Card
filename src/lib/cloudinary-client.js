
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dzlyiowkh' // Fallback to what we saw in env
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default' // Default or need user input

export const uploadImage = async (file) => {
  if (!file) return null
  
  // If it's already a URL (not a File object), return it
  if (typeof file === 'string' && file.startsWith('http')) {
    return file
  }

  // If it's a base64 string (from previous implementation), we need to convert or upload it
  // But ideally we should be passing the File object from the input directly
  
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Upload failed')
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}
