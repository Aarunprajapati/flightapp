import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("accessToken")?.value;


  // if (!currentUser && request.nextUrl.pathname.startsWith("/auth/login")) {
  //   return Response.redirect(new URL("/auth/login", request.url));
  // }
  if (currentUser && request.nextUrl.pathname.startsWith("/auth/login")) {
    return Response.redirect(new URL("/", request.url));
  }
  if (!currentUser && request.nextUrl.pathname.startsWith("/flights/book")) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
