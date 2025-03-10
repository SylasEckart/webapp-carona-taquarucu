import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  // Check if the device is mobile
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);

  if (!isMobile && !request.nextUrl.pathname.startsWith('/sem-suporte')) {
    return NextResponse.redirect(new URL('/sem-suporte', request.url));
  }
  if(!isMobile && request.nextUrl.pathname.startsWith('/sem-suporte')) {
    return NextResponse.next();
  }
  if(isMobile && request.nextUrl.pathname.startsWith('/sem-suporte')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
