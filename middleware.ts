import { NextResponse, type NextRequest } from "next/server";
import {cookies} from "next/headers";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  // const currentUser = request.cookies.get("accessToken")?.value;
  const currentUserstore = cookies()
  const currentUser =currentUserstore.get("accessToken")?.value;
  console.log(currentUser, "current user",request.url)
  console.log("nextUrl",request.nextUrl)

  // if (!currentUser && request.nextUrl.pathname.startsWith("/auth/login")) {
  //   return Response.redirect(new URL("/auth/login", request.url));
  // }
  // if (currentUser ) {
  //   return Response.json({msg:'cookie not found'});
  // }
  if (currentUser && request.nextUrl.pathname.startsWith("/auth/login")) {
    return Response.redirect(new URL("/", request.url));
  }
  if (!currentUser && request.nextUrl.pathname.startsWith("/flights/book")) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
  if (!currentUser && request.nextUrl.pathname.startsWith("/checkoutpage")) {
    return Response.redirect(new URL("/auth/login", request.url));
  }
  // const publicRoutes = path === '/auth/login' || path === '/' || path === "/auth/register" || path === "/flights";

  // if(publicRoutes && currentUser){
  //   return NextResponse.redirect(new URL('/', request.nextUrl))
  // }
  // if(!publicRoutes && !currentUser){
  //     return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
