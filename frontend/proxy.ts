import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get(
        "access-token"
    )?.value;
    const protectedRoutes = [
        "/dashboard",
        "/expenses",
        "/budgets",
        "/goals",
        "/reports",
    ];

    const isProtected = protectedRoutes.some(
        (route) =>
            request.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !token) {
        return NextResponse.redirect(
            new URL("/auth", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/expenses/:path*",
        "/budgets/:path*",
        "/goals/:path*",
        "/reports/:path*",
    ],
};