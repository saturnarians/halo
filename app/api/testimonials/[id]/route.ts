import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: params.id },
    })
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }
    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("[v0] Get testimonial error:", error)
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      const body = await req.json()
      const testimonial = await prisma.testimonial.update({
        where: { id: params.id },
        data: body,
      })
      return NextResponse.json(testimonial)
    } catch (error) {
      console.error("[v0] Update testimonial error:", error)
      return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
    }
  })(req)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      await prisma.testimonial.delete({
        where: { id: params.id },
      })
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("[v0] Delete testimonial error:", error)
      return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
    }
  })(req)
}
