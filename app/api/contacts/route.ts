import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendContactEmail } from "@/lib/email"
import { withAuthMiddleware } from "@/lib/middleware"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    return withAuthMiddleware(async () => {
      try {
        const contacts = await prisma.contact.findMany({
          orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(contacts)
      } catch (error) {
        console.error("[v0] Get contacts error:", error)
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
      }
    })(req)
  }

  if (req.method === "POST") {
    try {
      const body = await req.json()

      const validation = contactSchema.safeParse(body)
      if (!validation.success) {
        return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 })
      }

      const { name, email, subject, message } = validation.data

      const contact = await prisma.contact.create({
        data: { name, email, subject, message },
      })

      const emailSent = await sendContactEmail({ name, email, subject, message })

      return NextResponse.json(
        {
          success: true,
          message: "Contact submitted successfully",
          id: contact.id,
        },
        { status: 201 },
      )
    } catch (error) {
      console.error("[v0] Create contact error:", error)
      return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export const GET = handler
export const POST = handler
