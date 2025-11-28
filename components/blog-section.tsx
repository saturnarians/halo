"use client"

import { motion } from "framer-motion"

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

export function BlogSection() {
  const blogPosts = [
    {
      id: "1",
      title: "Getting started with web design",
      date: "December 25, 2024",
      category: "Design",
      excerpt: "Learn the fundamentals of modern web design and best practices.",
    },
    {
      id: "2",
      title: "Advanced React patterns",
      date: "December 20, 2024",
      category: "Development",
      excerpt: "Explore advanced patterns and techniques for React applications.",
    },
    {
      id: "3",
      title: "UI/UX principles that work",
      date: "December 15, 2024",
      category: "Design",
      excerpt: "Essential principles for creating user-friendly interfaces.",
    },
    {
      id: "4",
      title: "Performance optimization tips",
      date: "December 10, 2024",
      category: "Development",
      excerpt: "Techniques to improve your website performance significantly.",
    },
  ]

  return (
    <motion.article variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.header variants={itemVariants}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Blog</h2>
      </motion.header>

      {/* Blog Posts Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, idx) => (
          <motion.article
            key={post.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: idx * 0.1 },
              },
            }}
            whileHover={{ y: -4 }}
            className="p-6 bg-card rounded-lg border border-border hover:border-accent transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-accent uppercase">{post.category}</span>
              <time className="text-xs text-muted-foreground">{post.date}</time>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2 hover:text-accent transition-colors">{post.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
            <motion.button
              whileHover={{ x: 4 }}
              className="mt-4 text-accent font-medium text-sm hover:gap-2 flex items-center gap-1"
            >
              Read more →
            </motion.button>
          </motion.article>
        ))}
      </motion.div>
    </motion.article>
  )
}
