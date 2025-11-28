"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutateData, useFetchData } from "@/lib/hooks"
import { Loader2 } from "lucide-react"

const educationSchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().min(1, "Field of study is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
})

type EducationFormData = z.infer<typeof educationSchema>

interface EducationFormProps {
  educationId?: string
  onSuccess: () => void
  onCancel: () => void
}

export function EducationForm({ educationId, onSuccess, onCancel }: EducationFormProps) {
  const { data: edu } = useFetchData(`/api/resume/education/${educationId}`)
  const { mutate, loading: mutateLoading } = useMutateData()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: edu
      ? {
          ...edu,
          startDate: new Date(edu.startDate).toISOString().split("T")[0],
          endDate: edu.endDate ? new Date(edu.endDate).toISOString().split("T")[0] : "",
        }
      : {},
  })

  const onSubmit = async (data: EducationFormData) => {
    try {
      const payload = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      }
      const method = educationId ? "PUT" : "POST"
      const endpoint = educationId ? `/api/resume/education/${educationId}` : "/api/resume/education"
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
      <h3 className="text-lg font-semibold text-foreground">{educationId ? "Edit Education" : "Add Education"}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">School/University</label>
          <input
            {...register("school")}
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
            placeholder="School name"
          />
          {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Degree</label>
            <input
              {...register("degree")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="e.g. Bachelor"
            />
            {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Field of Study</label>
            <input
              {...register("field")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="e.g. Computer Science"
            />
            {errors.field && <p className="text-red-500 text-xs mt-1">{errors.field.message}</p>}
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
            placeholder="Additional details..."
          />
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={mutateLoading}
            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium"
          >
            {mutateLoading ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
            {educationId ? "Update" : "Add"} Education
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
