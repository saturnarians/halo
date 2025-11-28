"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export interface Admin {
  id: string
  email: string
  name?: string
}

export function useAuth() {
  const router = useRouter()
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setAdmin(data.admin)
        } else {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("[v0] Auth check error:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    fetchAdmin()
  }, [router])

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setAdmin(null)
      router.push("/admin/login")
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return { admin, loading, logout }
}
