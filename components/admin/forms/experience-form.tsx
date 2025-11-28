"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutateData, useFetchData } from "@/lib/hooks"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
})

type ExperienceFormData = z.infer<typeof experienceSchema>

interface ExperienceFormProps {
  experienceId?: string
  onSuccess: () => void
  onCancel: () => void
}

export function ExperienceForm({ experienceId, onSuccess, onCancel }: ExperienceFormProps) {
  const { data: exp } = useFetchData(`/api/resume/experience/${experienceId}`)
  const { mutate, loading: mutateLoading } = useMutateData()
  const [techInput, setTechInput] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: exp
      ? {
          ...exp,
          startDate: new Date(exp.startDate).toISOString().split("T")[0],
          endDate: exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "",
        }
      : { technologies: [] },
  })

  const technologies = watch("technologies")

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

  const onSubmit = async (data: ExperienceFormData) => {
    try {
      const payload = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      }
      const method = experienceId ? "PUT" : "POST"
      const endpoint = experienceId ? `/api/resume/experience/${experienceId}` : "/api/resume/experience"
      await mutate(endpoint, payload, { method })
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
      <h3 className="text-lg font-semibold text-foreground">{experienceId ? "Edit Experience" : "Add Experience"}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Company</label>
            <input
              {...register("company")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="Company name"
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Position</label>
            <input
              {...register("position")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="Job title"
            />
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
            <input
              {...register("startDate")}
              type="date"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
            />
            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">End Date (Optional)</label>
            <input
              {...register("endDate")}
              type="date"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors resize-none"
            rows={3}
            placeholder="Job description and achievements..."
          />
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
            disabled={mutateLoading}
            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium"
          >
            {mutateLoading ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
            {experienceId ? "Update" : "Add"} Experience
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
