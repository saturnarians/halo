import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./auth"

export function withAuthMiddleware(handler: (req: NextRequest) => Promise<NextResponse | any>) {
  return async (req: NextRequest) => {
    const token = req.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const requestWithAuth = new NextRequest(req, {
      headers: {
        "x-admin-id": payload.id,
        "x-admin-email": payload.email,
      },
    })

    return handler(requestWithAuth)
  }
}

export function getAdminFromRequest(req: NextRequest) {
  return {
    id: req.headers.get("x-admin-id") || "",
    email: req.headers.get("x-admin-email") || "",
  }
}
