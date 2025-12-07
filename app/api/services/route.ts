import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const services = await prisma.service.findMany()
      return NextResponse.json(services)
    } catch (error) {
      console.error("[v0] Get services error:", error)
      return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
    }
  }

  if (req.method === "POST") {
    return withAuthMiddleware(async () => {
      try {
        const body = await req.json()
        const service = await prisma.service.create({ data: body })
        return NextResponse.json(service, { status: 201 })
      } catch (error) {
        console.error("[v0] Create service error:", error)
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
      }
    })(req)
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export const GET = handler
export const POST = handler
