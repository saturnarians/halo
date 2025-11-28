"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutateData, useFetchData } from "@/lib/hooks"
import { Loader2 } from "lucide-react"

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  proficiency: z.number().min(0).max(100),
})

type SkillFormData = z.infer<typeof skillSchema>

interface SkillFormProps {
  skillId?: string
  onSuccess: () => void
  onCancel: () => void
}

export function SkillForm({ skillId, onSuccess, onCancel }: SkillFormProps) {
  const { data: skill } = useFetchData(`/api/skills/${skillId}`)
  const { mutate, loading: mutateLoading } = useMutateData()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: skill || { proficiency: 70 },
  })

  const proficiency = watch("proficiency")

  const onSubmit = async (data: SkillFormData) => {
    try {
      const method = skillId ? "PUT" : "POST"
      const endpoint = skillId ? `/api/skills/${skillId}` : "/api/skills"
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
      <h3 className="text-lg font-semibold text-foreground">{skillId ? "Edit Skill" : "Add Skill"}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Skill Name</label>
          <input
            {...register("name")}
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
            placeholder="e.g. React"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Category</label>
          <input
            {...register("category")}
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
            placeholder="e.g. Frontend"
          />
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Proficiency: {proficiency}%</label>
          <input
            {...register("proficiency", { valueAsNumber: true })}
            type="range"
            min="0"
            max="100"
            className="w-full"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={mutateLoading}
            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium"
          >
            {mutateLoading ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
            {skillId ? "Update" : "Create"} Skill
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
