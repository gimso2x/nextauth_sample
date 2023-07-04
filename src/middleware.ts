import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authUrl = ["/dashboard"];
const unAuthUrl = ["/login", "/join"];
const adminUrl = ["/admin"];
export const config = { matcher: ["/login", "/join", "/dashboard", "/admin"] };

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (unAuthUrl.some((path) => pathname.includes(path))) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (authUrl.some((path) => pathname.includes(path))) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (adminUrl.includes(pathname)) {
    if (!session || session.name !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
