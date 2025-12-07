import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const experience = await prisma.experience.findMany({
        orderBy: { startDate: "desc" },
      })
      return NextResponse.json(experience)
    } catch (error) {
      console.error("[v0] Get experience error:", error)
      return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 })
    }
  }

  if (req.method === "POST") {
    return withAuthMiddleware(async () => {
      try {
        const body = await req.json()
        const exp = await prisma.experience.create({ data: body })
        return NextResponse.json(exp, { status: 201 })
      } catch (error) {
        console.error("[v0] Create experience error:", error)
        return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
      }
    })(req)
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export const GET = handler
export const POST = handler
