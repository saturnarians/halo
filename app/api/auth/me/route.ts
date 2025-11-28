import { NextResponse } from "next/server"
import { getCurrentAdmin } from "@/lib/auth"

export async function GET() {
  try {
    const admin = await getCurrentAdmin()
    console.log('ADMIN:', admin)
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ admin })
  } catch (error) {
    console.error("Get admin error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
