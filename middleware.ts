import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/generate", "/take"];
const authRoutes = ["/sign-in", "/sign-up"];

export const middleware = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/", req.url)); 
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/generate", "/take/:path*","/courses","/create", "/sign-in", "/sign-up"],
};
