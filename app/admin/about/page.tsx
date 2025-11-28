"use client"

import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addService, updateService, deleteService } from "@/lib/slices/portfolioSlice"
import { ServiceManager } from "@/components/admin/service-manager"
import { useState } from "react"
import { Plus } from "lucide-react"

export default function AboutAdminPage() {
  const dispatch = useAppDispatch()
  const services = useAppSelector((state) => state.portfolio.services)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services & About</h1>
          <p className="text-muted-foreground mt-1">Manage your services</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <ServiceManager
          item={editingId ? services.find((s) => s.id === editingId) : undefined}
          onSave={(item) => {
            if (editingId) {
              dispatch(updateService(item))
              setEditingId(null)
            } else {
              dispatch(addService(item))
              setIsAddingNew(false)
            }
          }}
          onCancel={() => {
            setIsAddingNew(false)
            setEditingId(null)
          }}
        />
      )}

      {/* Services Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            layout
            className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingId(service.id)}
                className="flex-1 px-3 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-500/20 transition-colors text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteService(service.id))}
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
