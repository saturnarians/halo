"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Testimonial } from "@/lib/slices/portfolioSlice"

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  avatar: z.string().min(1, "Avatar URL is required"),
  text: z.string().min(10, "Testimonial must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
})

type TestimonialFormData = z.infer<typeof testimonialSchema>

interface TestimonialManagerProps {
  item?: Testimonial
  onSave: (item: Testimonial) => void
  onCancel: () => void
}

export function TestimonialManager({ item, onSave, onCancel }: TestimonialManagerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: item || {},
  })

  const onSubmit = (data: TestimonialFormData) => {
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
      <h3 className="text-lg font-semibold text-foreground">{item ? "Edit Testimonial" : "Add New Testimonial"}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Name</label>
            <input
              {...register("name")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="Client name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date</label>
            <input
              {...register("date")}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              placeholder="e.g. 14 June, 2021"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Avatar URL</label>
          <input
            {...register("avatar")}
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
            placeholder="/images/avatar.png"
          />
          {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Testimonial</label>
          <textarea
            {...register("text")}
            className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors resize-none"
            rows={4}
            placeholder="Client testimonial..."
          />
          {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
        </div>

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
