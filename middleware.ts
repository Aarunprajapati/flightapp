import { NextResponse, type NextRequest } from "next/server";
import {cookies} from "next/headers";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log("request>>>>>",request.cookies)
  // const currentUser = request.cookies.get("accessToken")?.value;
  const currentUserstore = cookies()
  const currentUser =currentUserstore.get("accessToken")?.value;
  console.log("currentUser>>>>>>>>>",currentUser)
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

}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
