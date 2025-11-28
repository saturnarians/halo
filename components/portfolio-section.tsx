"use client"

import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setFilterCategory } from "@/lib/slices/portfolioSlice"
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

export function PortfolioSection() {
  const dispatch = useAppDispatch()
  const { portfolioItems, filterCategory } = useAppSelector((state) => state.portfolio)
  const isLoading = useAppSelector((state) => state.portfolio.isLoading)

  const categories = ["all", ...new Set(portfolioItems.map((item) => item.category))]
  const filteredItems =
    filterCategory === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === filterCategory)

  return (
    <motion.article variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.header variants={itemVariants}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Portfolio</h2>
      </motion.header>

      {/* Filter Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        {categories.map((category, idx) => (
          <motion.button
            key={category}
            onClick={() => dispatch(setFilterCategory(category))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              filterCategory === category
                ? "bg-accent text-accent-foreground"
                : "bg-card border border-border text-foreground hover:border-accent"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Portfolio Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <CardSkeleton key={i} />
            ))}
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.3,
                delay: idx * 0.05,
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-lg border border-border hover:border-accent transition-colors cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden bg-muted">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 bg-card group-hover:bg-card/90 transition-colors">
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-accent capitalize mb-2">{item.category}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
              >
                <motion.div initial={{ scale: 0.8 }} whileHover={{ scale: 1 }} className="text-center">
                  <p className="text-white font-semibold mb-2">{item.title}</p>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {filteredItems.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <p className="text-muted-foreground">No projects found for this category.</p>
        </motion.div>
      )}
    </motion.article>
  )
}
