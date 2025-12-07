"use client"

import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addTestimonial, updateTestimonial, deleteTestimonial } from "@/store/slices/portfolioSlice"
import { TestimonialManager } from "@/components/admin/testimonial-manager"
import { useState } from "react"
import { Plus } from "lucide-react"

export default function TestimonialsAdminPage() {
  const dispatch = useAppDispatch()
  const testimonials = useAppSelector((state) => state.portfolio.testimonials)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client testimonials</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <TestimonialManager
          item={editingId ? testimonials.find((t) => t.id === editingId) : undefined}
          onSave={(item) => {
            if (editingId) {
              dispatch(updateTestimonial(item))
              setEditingId(null)
            } else {
              dispatch(addTestimonial(item))
              setIsAddingNew(false)
            }
          }}
          onCancel={() => {
            setIsAddingNew(false)
            setEditingId(null)
          }}
        />
      )}

      {/* Testimonials List */}
      <motion.div layout className="space-y-4">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            layout
            className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
          >
            <div className="flex gap-4 mb-4">
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.date}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{testimonial.text}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingId(testimonial.id)}
                className="flex-1 px-3 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-500/20 transition-colors text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTestimonial(testimonial.id))}
                className="flex-1 px-3 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded hover:bg-red-500/20 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
