import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard", "/test", "/profile", "/ai-tutor"];
const adminRoute = "/admin";

// Allowed admin emails (configured via environment variable)
const getAdminEmails = (): string[] => {
  const emails = process.env.ADMIN_EMAILS;
  if (!emails) return [];
  return emails.split(",").map(e => e.trim().toLowerCase());
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminRoute = pathname.startsWith(adminRoute);

  if (!isProtected && !isAdminRoute) {
    return NextResponse.next();
  }

  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If not authenticated, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Admin route - check if user has admin access
  if (isAdminRoute) {
    const userEmail = (token.email || "").toLowerCase();
    const allowedEmails = getAdminEmails();

    if (!allowedEmails.includes(userEmail)) {
      // Redirect to dashboard if not an admin
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/test/:path*", "/profile/:path*", "/ai-tutor/:path*", "/admin/:path*"],
};
