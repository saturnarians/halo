import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      const { read } = await req.json()
      const contact = await prisma.contact.update({
        where: { id: params.id },
        data: { read },
      })
      return NextResponse.json(contact)
    } catch (error) {
      console.error("[v0] Update contact error:", error)
      return NextResponse.json({ error: "Failed to update contact" }, { status: 500 })
    }
  })(req)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      await prisma.contact.delete({ where: { id: params.id } })
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("[v0] Delete contact error:", error)
      return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 })
    }
  })(req)
}
