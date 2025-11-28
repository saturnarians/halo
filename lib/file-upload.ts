export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
export const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024 // 10MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Invalid image type. Allowed: JPEG, PNG, WebP, GIF"
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return `Image size exceeds ${MAX_IMAGE_SIZE / 1024 / 1024}MB limit`
  }

  return null
}

export function validateDocumentFile(file: File): string | null {
  if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
    return "Invalid document type. Allowed: PDF, DOC, DOCX"
  }

  if (file.size > MAX_DOCUMENT_SIZE) {
    return `Document size exceeds ${MAX_DOCUMENT_SIZE / 1024 / 1024}MB limit`
  }

  return null
}

export function getFileExtension(filename: string): string {
  return filename.split(".").pop() || ""
}

export function generateUniqueFilename(originalName: string): string {
  const ext = getFileExtension(originalName)
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${random}.${ext}`
}
