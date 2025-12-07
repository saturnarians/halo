import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const portfolios = await prisma.portfolio.findMany({
        orderBy: { createdAt: "desc" },
      })
      return NextResponse.json(portfolios)
    } catch (error) {
      console.error("[v0] Get portfolios error:", error)
      return NextResponse.json({ error: "Failed to fetch portfolios" }, { status: 500 })
    }
  }

  if (req.method === "POST") {
    return withAuthMiddleware(async () => {
      try {
        const body = await req.json()
        const portfolio = await prisma.portfolio.create({
          data: body,
        })
        return NextResponse.json(portfolio, { status: 201 })
      } catch (error) {
        console.error("[v0] Create portfolio error:", error)
        return NextResponse.json({ error: "Failed to create portfolio" }, { status: 500 })
      }
    })(req)
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export const GET = handler
export const POST = handler
