"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"

interface UseFetchDataOptions {
  onSuccess?: (data: any) => void
}

export function useFetchData(url: string, options: UseFetchDataOptions = {}) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error("Failed to fetch")

        const result = await response.json()
        setData(result)
        options.onSuccess?.(result)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred"
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, options])

  return { data, loading, error }
}
