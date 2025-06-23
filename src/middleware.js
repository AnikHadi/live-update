// middleware.js or middleware.ts
import { NextResponse } from "next/server";
import { auth } from "./auth";

// export default async function middleware(request) {
//   const session = await auth();
//   const { pathname } = request.nextUrl;

//   // Define your protected routes
//   const protectedRoutes = ["/dashboard", "/settings"];

//   // Check if the current path is a protected route
//   if (protectedRoutes.includes(pathname)) {
//     // Implement your authentication/authorization logic here
//     // For example, check for a valid authentication token in cookies

//     const token = await getToken({ req });
//     if (!token) {
//       //   return res.status(401).json({ message: "Unauthorized" });
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     //   next();

//     // const authToken = request.cookies.get("auth_token");

//     // if (!authToken) {
//     //   // Redirect to login page if not authenticated
//     //   return NextResponse.redirect(new URL("/login", request.url));
//     // }
//   }

//   // Allow the request to proceed if not a protected route or if authenticated
//   return NextResponse.next();
// }

export default async function middleware(request) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Define your protected routes
  const protectedRoutes = ["/settings"]; //"/dashboard",

  // Check if the current path is a protected route
  const isProtected = protectedRoutes.includes(pathname);

  if (isProtected && !session) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
