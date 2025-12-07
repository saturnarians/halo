import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    })
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json(blog)
  } catch (error) {
    console.error("[v0] Get blog error:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      const body = await req.json()
      const blog = await prisma.blog.update({
        where: { id: params.id },
        data: {
          ...body,
          publishedAt: body.published && !body.publishedAt ? new Date() : body.publishedAt,
        },
      })
      return NextResponse.json(blog)
    } catch (error) {
      console.error("[v0] Update blog error:", error)
      return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
    }
  })(req)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return withAuthMiddleware(async () => {
    try {
      await prisma.blog.delete({
        where: { id: params.id },
      })
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("[v0] Delete blog error:", error)
      return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
    }
  })(req)
}
