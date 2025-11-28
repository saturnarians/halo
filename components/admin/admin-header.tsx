"use client"

import { usePathname } from "next/navigation"
import { LogOut, User } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function AdminHeader() {
  const pathname = usePathname()
  const { admin, logout } = useAuth()

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean)
    const lastSegment = segments[segments.length - 1]
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  }

  const handleLogout = async () => {
    await logout()
    toast.success("Logged out successfully")
  }

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <h2 className="text-xl font-bold text-foreground">{getPageTitle()}</h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{admin?.email}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-red-600 dark:text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  )
}
