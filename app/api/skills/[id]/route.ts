import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id: params.id },
    })
    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 })
    }
    return NextResponse.json(skill)
  } catch (error) {
    console.error("[v0] Get skill error:", error)
    return NextResponse.json({ error: "Failed to fetch skill" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      const body = await req.json()
      const skill = await prisma.skill.update({
        where: { id: params.id },
        data: body,
      })
      return NextResponse.json(skill)
    } catch (error) {
      console.error("[v0] Update skill error:", error)
      return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
    }
  })(req)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      await prisma.skill.delete({
        where: { id: params.id },
      })
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("[v0] Delete skill error:", error)
      return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
    }
  })(req)
}
