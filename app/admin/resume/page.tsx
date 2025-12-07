"use client"

import { motion } from "framer-motion"
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import { useFetchData, useMutateData } from "@/hooks"
import { SkillForm } from "@/components/admin/forms/skill-form"
import { EducationForm } from "@/components/admin/forms/education-form"
import { ExperienceForm } from "@/components/admin/forms/experience-form"

export default function ResumeAdminPage() {
  const { data: skills = [], loading: skillsLoading } = useFetchData("/api/skills")
  const { data: education = [], loading: educationLoading } = useFetchData("/api/resume/education")
  const { data: experience = [], loading: experienceLoading } = useFetchData("/api/resume/experience")
  const { mutate, loading: mutateLoading } = useMutateData()

  const [activeTab, setActiveTab] = useState<"skills" | "education" | "experience">("skills")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleDelete = async (endpoint: string, id: string) => {
    if (!confirm("Delete this item?")) return

    try {
      await mutate(`${endpoint}/${id}`, undefined, { method: "DELETE" })
      window.location.reload()
    } catch (error) {
      console.error("[v0] Delete error:", error)
    }
  }

  const tabs = [
    { id: "skills", label: "Skills", data: skills, endpoint: "/api/skills", count: skills.length },
    {
      id: "education",
      label: "Education",
      data: education,
      endpoint: "/api/resume/education",
      count: education.length,
    },
    {
      id: "experience",
      label: "Experience",
      data: experience,
      endpoint: "/api/resume/experience",
      count: experience.length,
    },
  ]

  const currentTab = tabs.find((t) => t.id === activeTab)
  const loading =
    activeTab === "skills" ? skillsLoading : activeTab === "education" ? educationLoading : experienceLoading

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resume Management</h1>
          <p className="text-muted-foreground mt-1">Manage skills, education & experience</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          disabled={isAddingNew || !!editingId}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {(isAddingNew || editingId) && (
        <>
          {activeTab === "skills" && (
            <SkillForm
              skillId={editingId || undefined}
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
          {activeTab === "education" && (
            <EducationForm
              educationId={editingId || undefined}
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
          {activeTab === "experience" && (
            <ExperienceForm
              experienceId={editingId || undefined}
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
        </>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <motion.div layout className="space-y-3">
          {currentTab?.data.map((item: any) => (
            <motion.div
              key={item.id}
              layout
              className="bg-card border border-border rounded-lg p-4 flex items-start justify-between hover:border-accent transition-colors"
            >
              <div className="flex-1">
                {activeTab === "skills" && (
                  <>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category} - {item.proficiency}%
                    </p>
                  </>
                )}
                {activeTab === "education" && (
                  <>
                    <h3 className="font-semibold text-foreground">
                      {item.degree} in {item.field}
                    </h3>
                    <p className="text-sm text-accent">{item.school}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.startDate).getFullYear()} -{" "}
                      {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
                    </p>
                  </>
                )}
                {activeTab === "experience" && (
                  <>
                    <h3 className="font-semibold text-foreground">{item.position}</h3>
                    <p className="text-sm text-accent">{item.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.startDate).getFullYear()} -{" "}
                      {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
                    </p>
                  </>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setEditingId(item.id)}
                  disabled={editingId || isAddingNew}
                  className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-sm font-medium hover:bg-blue-500/20 disabled:opacity-50 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(currentTab?.endpoint || "", item.id)}
                  disabled={mutateLoading}
                  className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 rounded text-sm font-medium hover:bg-red-500/20 disabled:opacity-50 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!loading && currentTab?.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No {activeTab} added yet</p>
        </div>
      )}
    </motion.div>
  )
}
