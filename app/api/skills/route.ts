import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const skills = await prisma.skill.findMany()
      return NextResponse.json(skills)
    } catch (error) {
      console.error("[v0] Get skills error:", error)
      return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
    }
  }

  if (req.method === "POST") {
    return withAuthMiddleware(async () => {
      try {
        const body = await req.json()
        const skill = await prisma.skill.create({ data: body })
        return NextResponse.json(skill, { status: 201 })
      } catch (error) {
        console.error("[v0] Create skill error:", error)
        return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
      }
    })(req)
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export const GET = handler
export const POST = handler
