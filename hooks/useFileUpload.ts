"use client"

import { useState } from "react"
import { toast } from "sonner"

interface UseFileUploadOptions {
  type?: "image" | "document"
  onSuccess?: (url: string, filename: string) => void
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = async (file: File) => {
    setLoading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const endpoint = options.type === "document" ? "/api/upload/document" : "/api/upload/image"

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const result = await response.json()
      setProgress(100)
      toast.success("File uploaded successfully")
      options.onSuccess?.(result.url, result.filename)

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed"
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  return { upload, loading, progress }
}
