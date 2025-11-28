import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { withAuthMiddleware } from "@/lib/middleware"

const UPLOAD_DIR = process.env.UPLOAD_DIR || "public/uploads"
const MAX_FILE_SIZE = Number.parseInt(process.env.NEXT_PUBLIC_UPLOAD_MAX_SIZE || "10485760")

async function handler(req: NextRequest) {
  return withAuthMiddleware(async () => {
    try {
      const formData = await req.formData()
      const file = formData.get("file") as File

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: "File too large" }, { status: 400 })
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${Date.now()}-${file.name}`
      const filepath = join(process.cwd(), UPLOAD_DIR, filename)

      try {
        await mkdir(join(process.cwd(), UPLOAD_DIR), { recursive: true })
      } catch (error) {
        // Directory already exists
      }

      await writeFile(filepath, buffer)

      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
      })
    } catch (error) {
      console.error("[v0] Upload error:", error)
      return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
  })(req)
}

export const POST = handler
