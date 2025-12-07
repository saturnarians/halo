"use client"

import { motion } from "framer-motion"
import { Loader2, Trash2, Mail } from "lucide-react"
import { useFetchData, useMutateData } from "@/hooks"
import { formatDistanceToNow } from "date-fns"

export default function ContactAdminPage() {
  const { data: contacts = [], loading } = useFetchData("/api/contacts")
  const { mutate, loading: mutateLoading } = useMutateData()

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return

    try {
      await mutate(`/api/contacts/${id}`, undefined, { method: "DELETE" })
      window.location.reload()
    } catch (error) {
      console.error("[v0] Delete error:", error)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
        <p className="text-muted-foreground mt-1">View and manage contact form submissions</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <motion.div layout className="space-y-3">
          {contacts.map((msg: any) => (
            <motion.div
              key={msg.id}
              layout
              className="bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{msg.name}</h3>
                    {!msg.read && (
                      <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">New</span>
                    )}
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    {msg.email}
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium text-foreground mb-1">{msg.subject}</p>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(msg.id)}
                  disabled={mutateLoading}
                  className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 rounded text-sm font-medium hover:bg-red-500/20 disabled:opacity-50 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && contacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No contact messages yet</p>
        </div>
      )}
    </motion.div>
  )
}
