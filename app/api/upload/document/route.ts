import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { withAuthMiddleware } from "@/lib/middleware"
import { validateDocumentFile, generateUniqueFilename } from "@/lib/file-upload"

const UPLOAD_DIR = "public/uploads/documents"

async function handler(req: NextRequest) {
  return withAuthMiddleware(async () => {
    try {
      const formData = await req.formData()
      const file = formData.get("file") as File

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
      }

      const validationError = validateDocumentFile(file)
      if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 })
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = generateUniqueFilename(file.name)
      const filepath = join(process.cwd(), UPLOAD_DIR, filename)

      try {
        await mkdir(join(process.cwd(), UPLOAD_DIR), { recursive: true })
      } catch (error) {
        // Directory already exists
      }

      await writeFile(filepath, buffer)

      return NextResponse.json({
        success: true,
        url: `/uploads/documents/${filename}`,
        filename,
      })
    } catch (error) {
      console.error("[v0] Document upload error:", error)
      return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
  })(req)
}

export const POST = handler
