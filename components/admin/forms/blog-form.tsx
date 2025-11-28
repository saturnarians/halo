"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { useMutateData, useFetchData, useFileUpload } from "@/lib/hooks"
import { Upload, Loader2 } from "lucide-react"

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
  author: z.string().min(1, "Author is required"),
  published: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
})

type BlogFormData = z.infer<typeof blogSchema>

interface BlogFormProps {
  blogId?: string
  onSuccess: () => void
  onCancel: () => void
}

export function BlogForm({ blogId, onSuccess, onCancel }: BlogFormProps) {
  const { data: blog } = useFetchData(`/api/blog/${blogId}`)
  const { mutate, loading: mutateLoading } = useMutateData()
  const { upload, loading: uploadLoading } = useFileUpload({ type: "image" })
  const [tagInput, setTagInput] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: blog || { tags: [], author: "" },
  })

  const tags = watch("tags")
  const image = watch("image")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await upload(file)
      setValue("image", result.url)
    } catch (error) {
      console.error("[v0] Upload error:", error)
    }
  }

  const addTag = () => {
    if (tagInput.trim()) {
      setValue("tags", [...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (index: number) => {
    setValue(
      "tags",
      tags.filter((_, i) => i !== index),
    )
  }

  const onSubmit = async (data: BlogFormData) => {
    try {
      const method = blogId ? "PUT" : "POST"
      const endpoint = blogId ? `/api/blog/${blogId}` : "/api/blog"
      await mutate(endpoint, data, { method })
      onSuccess()
    } catch (error) {
      console.error("[v0] Submit error:", error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground">{blogId ? "Edit Post" : "New Blog Post"}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              {...register("title")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="Blog post title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Author</label>
            <input
              {...register("author")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="Your name"
            />
            {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Featured Image</label>
          <div className="flex gap-2">
            <label className="flex-1 flex items-center justify-center px-4 py-8 rounded-lg bg-muted border-2 border-dashed border-border cursor-pointer hover:border-accent transition-colors">
              {uploadLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : (
                <div className="text-center">
                  <Upload className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadLoading}
                className="hidden"
              />
            </label>
            {image && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
                <img src={image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <input
              {...register("category")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="e.g. React, Design"
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors resize-none"
            rows={2}
            placeholder="Short description for preview"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Content</label>
          <textarea
            {...register("content")}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors resize-none"
            rows={6}
            placeholder="Full blog post content"
          />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="Add tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(idx)}
                  className="text-accent hover:text-accent/70 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input {...register("published")} type="checkbox" className="w-4 h-4 rounded border-border" />
            <span className="text-sm font-medium text-foreground">Publish immediately</span>
          </label>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={mutateLoading || uploadLoading}
            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium"
          >
            {mutateLoading ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
            {blogId ? "Update" : "Create"} Post
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={mutateLoading}
            className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 disabled:opacity-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}
