import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const testimonials = await prisma.testimonial.findMany()
      return NextResponse.json(testimonials)
    } catch (error) {
      console.error("[v0] Get testimonials error:", error)
      return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
    }
  }

  if (req.method === "POST") {
    return withAuthMiddleware(async () => {
      try {
        const body = await req.json()
        const testimonial = await prisma.testimonial.create({ data: body })
        return NextResponse.json(testimonial, { status: 201 })
      } catch (error) {
        console.error("[v0] Create testimonial error:", error)
        return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
      }
    })(req)
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export const GET = handler
export const POST = handler
