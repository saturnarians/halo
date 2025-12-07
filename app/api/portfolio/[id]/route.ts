import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
    })
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }
    return NextResponse.json(portfolio)
  } catch (error) {
    console.error("[v0] Get portfolio error:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      const body = await req.json()
      const portfolio = await prisma.portfolio.update({
        where: { id: params.id },
        data: body,
      })
      return NextResponse.json(portfolio)
    } catch (error) {
      console.error("[v0] Update portfolio error:", error)
      return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 })
    }
  })(req)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      await prisma.portfolio.delete({
        where: { id: params.id },
      })
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("[v0] Delete portfolio error:", error)
      return NextResponse.json({ error: "Failed to delete portfolio" }, { status: 500 })
    }
  })(req)
}
