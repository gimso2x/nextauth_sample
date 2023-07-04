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

  if (unAuthUrl.includes(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (authUrl.includes(pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (adminUrl.includes(pathname)) {
    if (!session || session.name !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
