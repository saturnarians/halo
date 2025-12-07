"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Plus, Loader2, Trash2, Edit2 } from "lucide-react"
import { useFetchData, useMutateData } from "@/hooks"
import { toast } from "sonner"
import { PortfolioForm } from "@/components/admin/forms/portfolio-form"

export default function PortfolioAdminPage() {
  const { data: portfolios = [], loading } = useFetchData("/api/portfolio")
  const { mutate, loading: mutateLoading } = useMutateData()
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      await mutate(`/api/portfolio/${id}`, undefined, { method: "DELETE" })
      // Refresh data - in a real app you'd use SWR or React Query
      window.location.reload()
    } catch (error) {
      console.error("[v0] Delete error:", error)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio items</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          disabled={isAddingNew || !!editingId}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {(isAddingNew || editingId) && (
        <PortfolioForm
          portfolioId={editingId || undefined}
          onSuccess={() => {
            setIsAddingNew(false)
            setEditingId(null)
            toast.success("Portfolio item saved successfully")
            window.location.reload()
          }}
          onCancel={() => {
            setIsAddingNew(false)
            setEditingId(null)
          }}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((item: any) => (
            <motion.div
              key={item.id}
              layout
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-colors"
            >
              <div className="relative h-40 bg-muted">
                {item.image && (
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-accent capitalize">{item.category}</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setEditingId(item.id)}
                    disabled={editingId || isAddingNew}
                    className="flex-1 px-3 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-500/20 disabled:opacity-50 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={mutateLoading}
                    className="flex-1 px-3 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded hover:bg-red-500/20 disabled:opacity-50 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && portfolios.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No portfolio items yet. Create your first one!</p>
        </div>
      )}
    </motion.div>
  )
}
