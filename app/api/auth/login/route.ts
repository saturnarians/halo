import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
  if (req.method !== "POST") {
    return new NextResponse(null, {status: 405});
  }

  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const token = signJwt({
    id: user.id,
    role: user.role,
  });

  const res = NextResponse.json({ id: user.id, email: user.email, role: user.role }, { status: 200 });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return res;
  
} catch (error) {
  console.error("Login error:", error);
  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
};
