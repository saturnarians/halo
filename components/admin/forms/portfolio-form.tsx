"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { useMutateData, useFetchData, useFileUpload } from "@/lib/hooks"
import { Upload, Loader2 } from "lucide-react"

const portfolioSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  link: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  technologies: z.array(z.string()).default([]),
})

type PortfolioFormData = z.infer<typeof portfolioSchema>

interface PortfolioFormProps {
  portfolioId?: string
  onSuccess: () => void
  onCancel: () => void
}

export function PortfolioForm({ portfolioId, onSuccess, onCancel }: PortfolioFormProps) {
  const { data: portfolio } = useFetchData(`/api/portfolio/${portfolioId}`)
  const { mutate, loading: mutateLoading } = useMutateData()
  const { upload, loading: uploadLoading } = useFileUpload({ type: "image" })
  const [techInput, setTechInput] = useState("")
  const [portfolioData, setPortfolioData] = useState(portfolio || { technologies: [] })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: portfolioData,
  })

  const technologies = watch("technologies")
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

  const addTechnology = () => {
    if (techInput.trim()) {
      setValue("technologies", [...technologies, techInput.trim()])
      setTechInput("")
    }
  }

  const removeTechnology = (index: number) => {
    setValue(
      "technologies",
      technologies.filter((_, i) => i !== index),
    )
  }

  const onSubmit = async (data: PortfolioFormData) => {
    try {
      const method = portfolioId ? "PUT" : "POST"
      const endpoint = portfolioId ? `/api/portfolio/${portfolioId}` : "/api/portfolio"
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
      <h3 className="text-lg font-semibold text-foreground">{portfolioId ? "Edit Project" : "Add New Project"}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              {...register("title")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="Project title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <input
              {...register("category")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="e.g. web design"
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Project Image</label>
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

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors resize-none"
            rows={3}
            placeholder="Project description"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Project Link (optional)</label>
            <input
              {...register("link")}
              type="url"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">GitHub Link (optional)</label>
            <input
              {...register("github")}
              type="url"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Technologies</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="Add technology..."
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(idx)}
                  className="text-accent hover:text-accent/70 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={mutateLoading || uploadLoading}
            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            {mutateLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {portfolioId ? "Update" : "Create"}
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
