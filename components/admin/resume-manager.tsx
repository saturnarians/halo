"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Skill, TimelineItem } from "@/lib/slices/portfolioSlice"

const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  percentage: z.coerce.number().min(0).max(100),
})

const timelineSchema = z.object({
  title: z.string().min(1, "Title is required"),
  period: z.string().min(1, "Period is required"),
  description: z.string().min(1, "Description is required"),
})

interface ResumeManagerProps {
  tab: "skills" | "education" | "experience"
  item?: Skill | TimelineItem
  onSave: (item: any) => void
  onCancel: () => void
}

export function ResumeManager({ tab, item, onSave, onCancel }: ResumeManagerProps) {
  const isSkill = tab === "skills"
  const schema = isSkill ? skillSchema : timelineSchema

  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: item || {},
  })

  const onSubmit = (data: FormData) => {
    onSave({
      id: item?.id || Date.now().toString(),
      ...data,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground">
        {item ? "Edit" : "Add"} {tab === "skills" ? "Skill" : tab === "education" ? "Education" : "Experience"}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{isSkill ? "Skill Name" : "Title"}</label>
          <input
            {...register("name" as any)}
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
            placeholder={isSkill ? "e.g. React" : "e.g. Software Engineer"}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {!isSkill && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Period</label>
            <input
              {...register("period")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="e.g. 2020 - 2023"
            />
            {errors.period && <p className="text-red-500 text-xs mt-1">{errors.period.message}</p>}
          </div>
        )}

        {isSkill ? (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Proficiency %</label>
            <input
              {...register("percentage")}
              type="number"
              min="0"
              max="100"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="85"
            />
            {errors.percentage && <p className="text-red-500 text-xs mt-1">{errors.percentage.message}</p>}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              {...register("description")}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors resize-none"
              rows={3}
              placeholder="Job description or details"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
          >
            {item ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}
