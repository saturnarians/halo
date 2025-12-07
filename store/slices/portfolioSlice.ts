import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  text: string
  date: string
}

export interface PortfolioItem {
  id: string
  title: string
  category: string
  image: string
  description: string
  link?: string
}

export interface Skill {
  id: string
  name: string
  percentage: number
}

export interface TimelineItem {
  id: string
  title: string
  period: string
  description: string
}

interface PortfolioState {
  services: Service[]
  testimonials: Testimonial[]
  portfolioItems: PortfolioItem[]
  filterCategory: string
  skills: Skill[]
  education: TimelineItem[]
  experience: TimelineItem[]
  isLoading: boolean
}

const initialState: PortfolioState = {
  services: [
    {
      id: "1",
      title: "Web design",
      description: "The most modern and high-quality design made at a professional level.",
      icon: "icon-design.svg",
    },
    {
      id: "2",
      title: "Web development",
      description: "High-quality development of sites at the professional level.",
      icon: "icon-dev.svg",
    },
    {
      id: "3",
      title: "Mobile apps",
      description: "Professional development of applications for iOS and Android.",
      icon: "icon-app.svg",
    },
    {
      id: "4",
      title: "Photography",
      description: "I make high-quality photos of any category at a professional level.",
      icon: "icon-photo.svg",
    },
  ],
  testimonials: [
    {
      id: "1",
      name: "Daniel lewis",
      avatar: "/assets/images/avatar-1.png",
      text: "Richard was hired to create a corporate identity. We were very pleased with the work done.",
      date: "14 June, 2021",
    },
    {
      id: "2",
      name: "Jessica miller",
      avatar: "/assets/images/avatar-2.png",
      text: "Exceptional work and attention to detail. Highly recommended for any project.",
      date: "10 May, 2021",
    },
    {
      id: "3",
      name: "Emily evans",
      avatar: "/assets/images/avatar-3.png",
      text: "Outstanding designer and developer. Made our vision come to life beautifully.",
      date: "5 April, 2021",
    },
    {
      id: "4",
      name: "Henry william",
      avatar: "/assets/images/avatar-4.png",
      text: "Professional, creative, and results-driven. A true asset to any team.",
      date: "20 March, 2021",
    },
  ],
  portfolioItems: [
    {
      id: "1",
      title: "Finance app",
      category: "web design",
      image: "/assets/images/project-1.jpg",
      description: "Modern finance application interface",
    },
    {
      id: "2",
      title: "Crypto dashboard",
      category: "web development",
      image: "/assets/images/project-2.png",
      description: "Real-time cryptocurrency tracking dashboard",
    },
    {
      id: "3",
      title: "E-commerce store",
      category: "web design",
      image: "/assets/images/project-3.jpg",
      description: "Complete e-commerce platform design",
    },
    {
      id: "4",
      title: "Todo app",
      category: "web development",
      image: "/assets/images/project-4.png",
      description: "Task management application",
    },
    {
      id: "5",
      title: "Music player",
      category: "web development",
      image: "/assets/images/project-5.png",
      description: "Streaming music application",
    },
    {
      id: "6",
      title: "Weather app",
      category: "web design",
      image: "/assets/images/project-6.png",
      description: "Beautiful weather forecast application",
    },
  ],
  filterCategory: "all",
  skills: [
    { id: "1", name: "Web design", percentage: 80 },
    { id: "2", name: "Graphic design", percentage: 70 },
    { id: "3", name: "Branding", percentage: 90 },
    { id: "4", name: "WordPress", percentage: 50 },
  ],
  education: [
    {
      id: "1",
      title: "University school of the arts",
      period: "2007 — 2008",
      description: "Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti.",
    },
    {
      id: "2",
      title: "New york academy of art",
      period: "2006 — 2007",
      description: "Ratione voluptatem sequi nesciunt, facere quisquams facere menda ossimus.",
    },
    {
      id: "3",
      title: "High school of art and design",
      period: "2002 — 2004",
      description: "Duis aute irure dolor in reprehenderit in voluptate, quila voluptas mag odit.",
    },
  ],
  experience: [
    {
      id: "1",
      title: "Creative director",
      period: "2015 — Present",
      description: "Nemo enim ipsam voluptatem blanditiis praesentium voluptum delenit atque.",
    },
    {
      id: "2",
      title: "Art director",
      period: "2013 — 2015",
      description: "Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque.",
    },
    {
      id: "3",
      title: "Web designer",
      period: "2010 — 2013",
      description: "Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque.",
    },
  ],
  isLoading: false,
}

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.services.push(action.payload)
    },
    updateService: (state, action: PayloadAction<Service>) => {
      const index = state.services.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) state.services[index] = action.payload
    },
    deleteService: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter((s) => s.id !== action.payload)
    },
    addTestimonial: (state, action: PayloadAction<Testimonial>) => {
      state.testimonials.push(action.payload)
    },
    updateTestimonial: (state, action: PayloadAction<Testimonial>) => {
      const index = state.testimonials.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) state.testimonials[index] = action.payload
    },
    deleteTestimonial: (state, action: PayloadAction<string>) => {
      state.testimonials = state.testimonials.filter((t) => t.id !== action.payload)
    },
    addPortfolioItem: (state, action: PayloadAction<PortfolioItem>) => {
      state.portfolioItems.push(action.payload)
    },
    updatePortfolioItem: (state, action: PayloadAction<PortfolioItem>) => {
      const index = state.portfolioItems.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) state.portfolioItems[index] = action.payload
    },
    deletePortfolioItem: (state, action: PayloadAction<string>) => {
      state.portfolioItems = state.portfolioItems.filter((p) => p.id !== action.payload)
    },
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload)
    },
    updateSkill: (state, action: PayloadAction<Skill>) => {
      const index = state.skills.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) state.skills[index] = action.payload
    },
    deleteSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((s) => s.id !== action.payload)
    },
    addEducation: (state, action: PayloadAction<TimelineItem>) => {
      state.education.push(action.payload)
    },
    updateEducation: (state, action: PayloadAction<TimelineItem>) => {
      const index = state.education.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) state.education[index] = action.payload
    },
    deleteEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter((e) => e.id !== action.payload)
    },
    addExperience: (state, action: PayloadAction<TimelineItem>) => {
      state.experience.push(action.payload)
    },
    updateExperience: (state, action: PayloadAction<TimelineItem>) => {
      const index = state.experience.findIndex((e) => e.id === action.payload.id)
      if (index !== -1) state.experience[index] = action.payload
    },
    deleteExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter((e) => e.id !== action.payload)
    },
  },
})

export const {
  setFilterCategory,
  setIsLoading,
  addService,
  updateService,
  deleteService,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  addSkill,
  updateSkill,
  deleteSkill,
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  updateExperience,
  deleteExperience,
} = portfolioSlice.actions
export default portfolioSlice.reducer
