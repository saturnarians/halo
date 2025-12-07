"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import { z } from "zod"

// 1. Define the Zod Schema for Validation
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

// Define the type based on the schema for cleaner state/variable usage
type LoginFormInput = z.infer<typeof LoginSchema>


export default function AdminLoginPage() {
  const router = useRouter()
  // 2. Use the Zod-inferred type for state initialization (optional, but good practice)
  const [formData, setFormData] = useState<LoginFormInput>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<LoginFormInput>>({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    // Clear the error for the field being edited
    if (errors[e.target.id as keyof LoginFormInput]) {
      setErrors((prev) => ({ ...prev, [e.target.id]: undefined }))
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({}) // Clear previous errors

    try {
      // 3. Client-side Validation with Zod
      const validationResult = LoginSchema.safeParse(formData)

      if (!validationResult.success) {
        // Map Zod errors to a simpler state object
        const newErrors: Partial<LoginFormInput> = {}
        for (const issue of validationResult.error.issues) {
          newErrors[issue.path[0] as keyof LoginFormInput] = issue.message
        }
        setErrors(newErrors)
        toast.error("Validation failed. Check your input.")
        setLoading(false)
        return
      }

      // 4. Use Axios for API Request
      const response = await axios.post("/api/auth/login", validationResult.data, {
        headers: { "Content-Type": "application/json" },
      })
      
      // Axios throws an error for 4xx/5xx status codes, so we only handle success here.
      if (response.status === 200) {
          toast.success("Login successful!")
          router.push("/admin")
      }
      
    } catch (error) {
      console.error("[v0] Login error:", error)
      
      // 5. Handle Axios and API errors
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ error: string }>
        const errorMessage = axiosError.response?.data?.error || "Login failed due to an API error."
        toast.error(errorMessage)
      } else {
        toast.error("An unexpected error occurred.")
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Enter your credentials to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="mt-6 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Email: admin@example.com</p>
              <p>Password: admin@123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}