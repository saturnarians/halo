import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const about = await prisma.about.findFirst()
      return NextResponse.json(about || {})
    } catch (error) {
      console.error("[v0] Get about error:", error)
      return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 })
    }
  }

  if (req.method === "POST") {
    return withAuthMiddleware(async () => {
      try {
        const body = await req.json()
        const existing = await prisma.about.findFirst()

        if (existing) {
          const updated = await prisma.about.update({
            where: { id: existing.id },
            data: body,
          })
          return NextResponse.json(updated)
        }

        const about = await prisma.about.create({ data: body })
        return NextResponse.json(about, { status: 201 })
      } catch (error) {
        console.error("[v0] Update about error:", error)
        return NextResponse.json({ error: "Failed to update about" }, { status: 500 })
      }
    })(req)
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export const GET = handler
export const POST = handler
