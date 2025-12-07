import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"
import GlobalListeners from "./listener/GlobalListeners"


const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Isibor Jerry | Portfolio",
  description: "Web Developer & Creative Director - Portfolio showcasing design and development work",
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", content: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", content: "#0f172a" },
  ],
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.className} font-sans antialiased`}>
        <GlobalListeners/>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
};

//suppressHydrationWarning={true}