import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const education = await prisma.education.findMany({
        orderBy: { startDate: "desc" },
      })
      return NextResponse.json(education)
    } catch (error) {
      console.error("[v0] Get education error:", error)
      return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 })
    }
  }

  if (req.method === "POST") {
    return withAuthMiddleware(async () => {
      try {
        const body = await req.json()
        const edu = await prisma.education.create({ data: body })
        return NextResponse.json(edu, { status: 201 })
      } catch (error) {
        console.error("[v0] Create education error:", error)
        return NextResponse.json({ error: "Failed to create education" }, { status: 500 })
      }
    })(req)
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export const GET = handler
export const POST = handler
