import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRE = process.env.JWT_EXPIRE as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
if (!JWT_EXPIRE) {
  throw new Error("JWT_EXPIRE is not defined in environment variables");
}

export interface JWTPayload {
  id: string
  email: string
  iat?: number
  exp?: number
}

export function generateToken(payload: Omit<JWTPayload, "iat" | "exp">) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

export async function getAuthCookie() {
  const cookieStore = await cookies()
  return cookieStore.get("auth_token")?.value
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
}

export async function getCurrentAdmin() {
  const token = await getAuthCookie()
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload) return null

  return payload
}
