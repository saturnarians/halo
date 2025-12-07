"use client"

import { motion } from "framer-motion"
import { useAppSelector } from "@/store/hooks"
import { Book, Briefcase } from "lucide-react"
import { CardSkeleton } from "./loading-skeleton"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function ResumeSection() {
  const { education, experience, skills } = useAppSelector((state) => state.portfolio)
  const isLoading = useAppSelector((state) => state.portfolio.isLoading)

  return (
    <motion.article variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.header variants={itemVariants}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Resume</h2>
      </motion.header>

      {/* Education */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-lg text-accent">
            <Book className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Education</h3>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <CardSkeleton key={i} />
              ))}
          </div>
        ) : (
          <ol className="space-y-6 border-l-2 border-accent/30">
            {education.map((item, idx) => (
              <motion.li
                key={item.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: idx * 0.1 },
                  },
                }}
                className="relative pl-6"
              >
                <div className="absolute -left-[13px] top-0 w-6 h-6 bg-accent rounded-full border-4 border-background" />
                <h4 className="text-xl font-semibold text-foreground mb-1">{item.title}</h4>
                <time className="text-sm text-accent font-medium">{item.period}</time>
                <p className="text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
              </motion.li>
            ))}
          </ol>
        )}
      </motion.section>

      {/* Experience */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-lg text-accent">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Experience</h3>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <CardSkeleton key={i} />
              ))}
          </div>
        ) : (
          <ol className="space-y-6 border-l-2 border-primary/30">
            {experience.map((item, idx) => (
              <motion.li
                key={item.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: idx * 0.1 },
                  },
                }}
                className="relative pl-6"
              >
                <div className="absolute -left-[13px] top-0 w-6 h-6 bg-primary rounded-full border-4 border-background" />
                <h4 className="text-xl font-semibold text-foreground mb-1">{item.title}</h4>
                <time className="text-sm text-primary font-medium">{item.period}</time>
                <p className="text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
              </motion.li>
            ))}
          </ol>
        )}
      </motion.section>

      {/* Skills */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h3 className="text-2xl font-bold text-foreground">My skills</h3>

        {isLoading ? (
          <div className="space-y-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <CardSkeleton key={i} />
              ))}
          </div>
        ) : (
          <div className="space-y-6 p-6 bg-card rounded-lg border border-border">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: idx * 0.1 },
                  },
                }}
              >
                <div className="flex justify-between mb-2">
                  <h5 className="font-semibold text-foreground">{skill.name}</h5>
                  <data className="text-sm font-medium text-accent">{skill.percentage}%</data>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </motion.article>
  )
}
