"use client"

import type React from "react"

import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

export function AdminProtected({ children }: { children: React.ReactNode }) {
  const { admin, loading, logout } = useAuth();
  console.log({ admin, loading });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!admin) {
    return (
            <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Not authorized</p>
      </div>
    )
  }
  return <>{children}</>
}
