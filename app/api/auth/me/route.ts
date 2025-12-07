import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies(); // FIXED
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyJwt(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ admin: user }, { status: 200 });
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
