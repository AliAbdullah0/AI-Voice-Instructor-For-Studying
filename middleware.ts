import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/generate", "/take"];

export const middleware = async (req: NextRequest) => {
    const cookie = await cookies();
    const sessionToken = cookie.get("session_token")?.value;

    const isProtectedRoute = protectedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute && !sessionToken) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/generate','/take/:path*'],
};