import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id: params.id },
    })
    if (!experience) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }
    return NextResponse.json(experience)
  } catch (error) {
    console.error("[v0] Get experience error:", error)
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      const body = await req.json()
      const experience = await prisma.experience.update({
        where: { id: params.id },
        data: body,
      })
      return NextResponse.json(experience)
    } catch (error) {
      console.error("[v0] Update experience error:", error)
      return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
    }
  })(req)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      await prisma.experience.delete({
        where: { id: params.id },
      })
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("[v0] Delete experience error:", error)
      return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
    }
  })(req)
}
