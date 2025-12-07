"use client"

import { useState, useCallback } from "react"

interface UseApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = useCallback(async (url: string, options: UseApiOptions = {}) => {
    const { method = "GET", onSuccess, onError } = options

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, { method })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Request failed")
      }

      onSuccess?.(data)
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      onError?.(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { request, loading, error }
}
