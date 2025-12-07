import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    })
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }
    return NextResponse.json(service)
  } catch (error) {
    console.error("[v0] Get service error:", error)
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      const body = await req.json()
      const service = await prisma.service.update({
        where: { id: params.id },
        data: body,
      })
      return NextResponse.json(service)
    } catch (error) {
      console.error("[v0] Update service error:", error)
      return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
    }
  })(req)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      await prisma.service.delete({
        where: { id: params.id },
      })
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("[v0] Delete service error:", error)
      return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
    }
  })(req)
}
