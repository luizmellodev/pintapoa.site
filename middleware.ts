import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // If it's the admin path, check for authentication
  if (path.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-this-in-production",
    })

    // If no token, redirect to login
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
}
