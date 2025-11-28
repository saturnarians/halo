import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { withAuthMiddleware } from "@/lib/middleware"

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
      })
      return NextResponse.json(blogs)
    } catch (error) {
      console.error("[v0] Get blogs error:", error)
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
    }
  }

  if (req.method === "POST") {
    return withAuthMiddleware(async () => {
      try {
        const body = await req.json()
        const slug = body.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "")

        const blog = await prisma.blog.create({
          data: {
            ...body,
            slug,
            publishedAt: body.published ? new Date() : null,
          },
        })
        return NextResponse.json(blog, { status: 201 })
      } catch (error) {
        console.error("[v0] Create blog error:", error)
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
      }
    })(req)
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export const GET = handler
export const POST = handler
