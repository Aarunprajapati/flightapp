import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract the pathname of the request URL
  const { pathname } = request.nextUrl;
console.log(pathname, "pathname")
  // Retrieve cookies directly from the request
  const accessToken = request.cookies.get("accessToken")?.value;
  const googleToken = request.cookies.get("googleToken")?.value;
console.log(accessToken, "accesstoken", googleToken, "googleToken");
  const publicPaths = ["/auth/login", "/auth/register", "/"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  

  if (!accessToken && !googleToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if ((accessToken || googleToken) && pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
