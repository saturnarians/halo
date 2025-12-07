import { NextResponse } from "next/server";
// import { serialize } from "cookie";

export function POST() {

  const res = NextResponse.json({message: "Logged out successfully"}, { status: 200 });

  res.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
    
  return res;
}
