import jwt, { SignOptions } from "jsonwebtoken"
// import { StringValue as MsStringValue } from "ms";

type ExpirationType = SignOptions['expiresIn'] ;

export type AuthPayload = {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRE: ExpirationType = "7d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
export const signJwt = (
    payload: Omit<AuthPayload, "iat" | "exp">, 
    expiresIn: ExpirationType = JWT_EXPIRE ): string => {
    const options: SignOptions = {
      expiresIn: expiresIn, 
    };
    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyJwt = (token: string): AuthPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    throw new Error("Invalid token" );
  }
};

// cookies management functions 
// reusable constant for cookie settings
  export const COOKIE = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    };


// export const removeAuthCookie = (res: NextResponse) => {
//     res.cookies.delete(AUTH_COOKIE_NAME);
// }

// export async function getAuthCookie() {
//   const cookieStore = await cookies()
//   return cookieStore.get("auth_token")?.value
// }

// export async function removeAuthCookie() {
//   const cookieStore = await cookies()
//   cookieStore.delete("auth_token")
// }

// export async function getCurrentAdmin() {
//   const token = await getAuthCookie()
//   if (!token) return null

//   const payload = verifyToken(token)
//   if (!payload) return null

//   return payload
// }
