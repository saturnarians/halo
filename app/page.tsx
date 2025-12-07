"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { AboutSection } from "@/components/about-section"
import { ResumeSection } from "@/components/resume-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { PageWrapper } from "@/components/page-wrapper"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { useEffect } from "react"
import { setIsMobile } from "@/store/slices/uiSlice"
// import * as Sentry from "@sentry/nextjs"

// when you initiate sentry you add un-comment the sentry export below
//  the codes and remove the export default function MainContent and leave only Main content
export default function MainContent() {
  const { currentPage } = useAppSelector((state) => state.navigation)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Set up mobile detection`
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 768))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [dispatch])

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-72">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-8">
          <PageWrapper isActive={currentPage === "about"}>
            <AboutSection />
          </PageWrapper>

          <PageWrapper isActive={currentPage === "resume"}>
            <ResumeSection />
          </PageWrapper>

          <PageWrapper isActive={currentPage === "portfolio"}>
            <PortfolioSection />
          </PageWrapper>

          <PageWrapper isActive={currentPage === "blog"}>
            <BlogSection />
          </PageWrapper>

          <PageWrapper isActive={currentPage === "contact"}>
            <ContactSection />
          </PageWrapper>
        </main>
      </div>
    </div>
  )
}

// Wrap with Sentry error boundary
// export default Sentry.withProfiler(MainContent)
