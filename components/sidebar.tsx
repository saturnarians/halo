"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleSidebar, setSidebarOpen } from "@/store/slices/navigationSlice"
import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Phone, Calendar, MapPin, Facebook, Twitter, Instagram, ChevronDown } from "lucide-react"
import { useEffect } from "react"

export function Sidebar() {
  const dispatch = useAppDispatch()
  const { sidebarOpen } = useAppSelector((state) => state.navigation)
  const isMobile = useAppSelector((state) => state.ui.isMobile)

  const sidebarVariants = {
    hidden: { x: isMobile ? -300 : 0, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const contactItems = [
    { icon: Mail, title: "Email", value: "richard@example.com", href: "mailto:richard@example.com" },
    { icon: Phone, title: "Phone", value: "+1 (213) 352-2795", href: "tel:+12133522795" },
    { icon: Calendar, title: "Birthday", value: "June 23, 1982", href: "" },
    { icon: MapPin, title: "Location", value: "Sacramento, California", href: "" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
  ]

  useEffect(() => {
    if (!isMobile) {
      dispatch(setSidebarOpen(true))
    }
  }, [isMobile, dispatch])

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(setSidebarOpen(false))}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar - made sidebar fixed on desktop and stays in viewport */}
      <motion.aside
        variants={sidebarVariants}
        initial={isMobile ? "hidden" : "visible"}
        animate={sidebarOpen || !isMobile ? "visible" : "hidden"}
        className={`fixed md:fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border z-50 md:z-40 overflow-y-auto
          ${isMobile && !sidebarOpen ? "pointer-events-none" : ""}`}
      >
        <div className="p-8">
          {/* Close button mobile */}
          {isMobile && (
            <button
              onClick={() => dispatch(setSidebarOpen(false))}
              className="absolute top-4 right-4 text-foreground hover:text-accent"
            >
              ✕
            </button>
          )}

          {/* Avatar and Info */}
          <div className="mb-8">
            <div className="mb-4 flex justify-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-primary">
                <Image
                  src="/assets/images/my-avatar.png"
                  alt="Richard hanrick"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground text-center mb-1">Richard hanrick</h1>
            <p className="text-center text-muted-foreground font-medium">Web developer</p>

            <button
              onClick={() => dispatch(toggleSidebar())}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors md:hidden"
            >
              <span className="text-sm">Show Contacts</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Contacts Section */}
          <motion.div
            initial={false}
            animate={{ height: sidebarOpen || !isMobile ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-b border-border py-8">
              <div className="space-y-6">
                {contactItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent/10 rounded-lg text-accent">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.title}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-foreground hover:text-accent transition-colors break-all"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <div className="flex gap-3 justify-center">
                {socialLinks.map((link, idx) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={idx}
                      href={link.href}
                      className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-lg text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  )
}
