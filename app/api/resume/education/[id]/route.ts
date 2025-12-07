import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const education = await prisma.education.findUnique({
      where: { id: params.id },
    })
    if (!education) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 })
    }
    return NextResponse.json(education)
  } catch (error) {
    console.error("[v0] Get education error:", error)
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      const body = await req.json()
      const education = await prisma.education.update({
        where: { id: params.id },
        data: body,
      })
      return NextResponse.json(education)
    } catch (error) {
      console.error("[v0] Update education error:", error)
      return NextResponse.json({ error: "Failed to update education" }, { status: 500 })
    }
  })(req)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      await prisma.education.delete({
        where: { id: params.id },
      })
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("[v0] Delete education error:", error)
      return NextResponse.json({ error: "Failed to delete education" }, { status: 500 })
    }
  })(req)
}
