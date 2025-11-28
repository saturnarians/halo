"use client"

import { motion } from "framer-motion"
import { Plus, Loader2, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import { useFetchData, useMutateData } from "@/lib/hooks"
import { BlogForm } from "@/components/admin/forms/blog-form"

export default function BlogAdminPage() {
  const { data: blogs = [], loading } = useFetchData("/api/blog")
  const { mutate, loading: mutateLoading } = useMutateData()
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      await mutate(`/api/blog/${id}`, undefined, { method: "DELETE" })
      window.location.reload()
    } catch (error) {
      console.error("[v0] Delete error:", error)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Manage your blog content</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          disabled={isAddingNew || !!editingId}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {(isAddingNew || editingId) && (
        <BlogForm
          blogId={editingId || undefined}
          onSuccess={() => {
            setIsAddingNew(false)
            setEditingId(null)
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
        <motion.div layout className="space-y-3">
          {blogs.map((post: any) => (
            <motion.div
              key={post.id}
              layout
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:border-accent transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{post.title}</h3>
                <div className="flex gap-4 mt-1">
                  <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-accent">{post.category}</p>
                  {post.published && (
                    <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded">Published</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setEditingId(post.id)}
                  disabled={editingId || isAddingNew}
                  className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-sm font-medium hover:bg-blue-500/20 disabled:opacity-50 transition-colors flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
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

      {!loading && blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts yet. Create your first one!</p>
        </div>
      )}
    </motion.div>
  )
}
