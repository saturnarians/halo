import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./lib/auth"

const protectedRoutes = ["/admin"]
const publicRoutes = ["/admin/login", "/api/auth/login", "/api/auth/me", "/api/contacts"]

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get("auth_token")?.value

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Allow API routes to handle their own auth
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
