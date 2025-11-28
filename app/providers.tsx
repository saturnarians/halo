"use client"

import type { ReactNode } from "react"
import { Provider } from "react-redux"
import { ThemeProvider } from "next-themes"
import { store } from "@/lib/store"
// import * as Sentry from "@sentry/nextjs"

export function Providers({ children }: { children: ReactNode }) {
  return (
    // <Sentry.ErrorBoundary fallback={<div>An error has occurred</div>}>
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </Provider>
    // {/* </Sentry.ErrorBoundary> */}
  )
};
