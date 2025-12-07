"use client"

import { useState } from "react"
import { toast } from "sonner"

interface UseMutateOptions {
  method: "POST" | "PUT" | "DELETE"
  onSuccess?: (data: any) => void
}

export function useMutateData() {
  const [loading, setLoading] = useState(false)

  const mutate = async (url: string, body?: any, options: UseMutateOptions = { method: "POST" }) => {
    setLoading(true)
    try {
      const response = await fetch(url, {
        method: options.method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Request failed")
      }

      const result = await response.json()
      options.onSuccess?.(result)
      toast.success(
        `${options.method === "DELETE" ? "Deleted" : options.method === "POST" ? "Created" : "Updated"} successfully`,
      )
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading }
}
