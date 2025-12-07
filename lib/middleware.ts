import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./jwt"; // Assuming verifyJwt returns a payload like { id: string, role: string }

// Define which paths are completely public and do not require any auth check
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/me",
  "/api/auth/logout",
  "/api/contacts", 
  "/api/dbconnection",
];

function getTokenFromHeader(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) {
    return undefined;
  }

  // Split the header into individual cookie pairs (e.g., ["name1=value1", "token=jwt_value", "name2=value2"])
  const cookies = cookieHeader.split(';');

  for (const cookie of cookies) {
    // Trim whitespace from the start of the cookie string
    const trimmedCookie = cookie.trim();
    
    // Check if the cookie starts with "token="
    if (trimmedCookie.startsWith("token=")) {
      // Return the value part (after "token=")
      return trimmedCookie.substring("token=".length);
    }
  }

  return undefined;
}


export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Allow public routes to proceed immediately
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const isApiRoute = pathname.startsWith("/api/");
  const loginUrl = new URL("/login", req.url);

  // 2. Custom Token Extraction from Cookie Header
  const token = req.cookies.get("token")?.value;



  // 3. No Token Check
  if (!token) {
    if (isApiRoute) {
      // API: Return 401 JSON response
      return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    }
    // UI Route: Redirect to login
    return NextResponse.redirect(loginUrl);
  }

  // 4. Token Verification and Authorization Check
  try {
    // Token is guaranteed to be a string here
    const payload = verifyJwt(token) as { id: string; role: string };

    // 5. Role Check for Protected Routes (Admin Area)
    // Checking for routes that require an 'admin' role
    const isAdminProtected = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

    if (isAdminProtected) {
      if (payload.role !== "admin") {
        if (isApiRoute) {
          // API: Return 403 Forbidden
          return NextResponse.json({ error: "Forbidden: Insufficient role" }, { status: 403 });
        }
        // UI Route: Redirect non-admins to login
        return NextResponse.redirect(loginUrl);
      }
    }
    
    // 6. Token is valid and role is sufficient, allow access
    return NextResponse.next();
    
  } catch (error) {
    console.error("Token verification failed:", error);
    // Token is invalid (expired, tampered, etc.)
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
    }
    return NextResponse.redirect(loginUrl);
  }
};
 
export const config = {
  // Matches all paths except those starting with a period (like _next/static, favicon.ico)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};