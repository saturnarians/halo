import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try{
     const userCount = await prisma.user.count();

    return NextResponse.json({ 
      status: "ok", 
      database: "connected",
      userCount: userCount,
      timestamp: new Date().toISOString() }, { status: 200 });
  } catch (error){
    console.error("Database connection error:", error);
    return NextResponse.json({ 
      status: "error", 
      database: "disconnected", 
      timestamp: new Date().toISOString() }, { status: 500 });
  }
}