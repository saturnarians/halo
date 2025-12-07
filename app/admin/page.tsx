"use client"

import { motion } from "framer-motion"
import { useAppSelector } from "@/lib/hooks"
import { ImageIcon, Briefcase, Users, FileText, BookOpen, Mail } from "lucide-react"
import Link from "next/link"
import {useEffect, useState } from "react"
import LoginPage from "../login/page"
// import { useAuth } from '@/hooks';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const dashboardCards = [
  {
    title: "Portfolio Projects",
    icon: ImageIcon,
    href: "/admin/portfolio",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Resume & Skills",
    icon: Briefcase,
    href: "/admin/resume",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    title: "Services & About",
    icon: FileText,
    href: "/admin/about",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    title: "Testimonials",
    icon: Users,
    href: "/admin/testimonials",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    title: "Blog Posts",
    icon: BookOpen,
    href: "/admin/blog",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  {
    title: "Contact Settings",
    icon: Mail,
    href: "/admin/contact",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
]

export default function AdminDashboard() {
  // const [admin, setAdmin] = useAuth();
  const [loading, setLoading] = useState(true);
  const portfolio = useAppSelector((state) => state.portfolio)

//   useEffect(() => {
//     async function check() {
//       try {
//         const res = await fetch("/api/auth/me");
//         if(res.ok) {
//    const data = await res.json();
//    setAdmin(data.admin);
// } else {
//    setAdmin(null);
// }
//       } catch(err) {
//         setAdmin(null);
//       }finally {
//         setLoading(false);
//       }
//     }
//     check();
//   },[]);

  // if (loading) return <div>Loading...</div>;
  // if (!admin) return <LoginPage />;


  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage all your portfolio content</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground text-sm mb-1">Total Projects</p>
          <p className="text-2xl font-bold text-foreground">{portfolio.portfolioItems.length}</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground text-sm mb-1">Services</p>
          <p className="text-2xl font-bold text-foreground">{portfolio.services.length}</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground text-sm mb-1">Skills</p>
          <p className="text-2xl font-bold text-foreground">{portfolio.skills.length}</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground text-sm mb-1">Testimonials</p>
          <p className="text-2xl font-bold text-foreground">{portfolio.testimonials.length}</p>
        </div>
      </motion.div>

      {/* Management Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <motion.slot
              key={card.title}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: idx * 0.05 },
                },
              }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={card.href}
                className="p-6 bg-card rounded-lg border border-border hover:border-accent transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage and update content</p>
              </Link>
            </motion.slot>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
