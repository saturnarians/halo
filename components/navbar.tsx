"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setCurrentPage } from "@/store/slices/navigationSlice"
import { motion } from "framer-motion"

const pages = ["about", "resume", "portfolio", "blog", "contact"] as const

export function Navbar() {
  const dispatch = useAppDispatch()
  const { currentPage } = useAppSelector((state) => state.navigation)

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
      <motion.ul
        className="flex items-center justify-center gap-1 px-4 py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pages.map((page) => (
          <motion.li key={page} variants={itemVariants}>
            <button
              onClick={() => dispatch(setCurrentPage(page))}
              className={`px-4 py-2 rounded-lg capitalize font-medium transition-all relative group ${
                currentPage === page ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {page}
              {currentPage === page && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  )
}
