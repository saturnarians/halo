"use client"

import { motion } from "framer-motion"
import { useAppSelector } from "@/lib/hooks"
import { CardSkeleton } from "./loading-skeleton"
import Image from "next/image"

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

export function AboutSection() {
  const { services } = useAppSelector((state) => state.portfolio)
  const isLoading = useAppSelector((state) => state.portfolio.isLoading)

  return (
    <motion.article variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.header variants={itemVariants}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About me</h2>
      </motion.header>

      {/* About Text */}
      <motion.section variants={itemVariants} className="space-y-4 text-muted-foreground">
        <p className="leading-relaxed">
          I'm Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media. I
          enjoy turning complex problems into simple, beautiful and intuitive designs.
        </p>
        <p className="leading-relaxed">
          My job is to build your website so that it is functional and user-friendly but at the same time attractive.
          Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is
          to bring across your message and identity in the most creative way.
        </p>
      </motion.section>

      {/* Services */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h3 className="text-2xl font-bold text-foreground">What i'm doing</h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <CardSkeleton key={i} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { delay: idx * 0.1 },
                  },
                }}
                className="flex gap-4 p-4 bg-card rounded-lg border border-border hover:border-accent transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Image src={`/assets/images/${service.icon}`} alt={service.title} width={24} height={24} />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{service.title}</h4>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Clients */}
      <motion.section variants={itemVariants} className="space-y-6">
        <h3 className="text-2xl font-bold text-foreground">Clients</h3>
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="w-32 h-20 bg-card rounded-lg border border-border flex items-center justify-center"
              >
                <div className="text-center text-muted-foreground text-sm">Client {idx + 1}</div>
              </motion.div>
            ))}
        </div>
      </motion.section>
    </motion.article>
  )
}
