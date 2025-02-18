import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // Debug log
  console.log('Middleware path:', path, 'Has token:', !!token);

  // If there's no token and we're not on auth pages, redirect to login
  if (!token && !path.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If we're on student dashboard and user is organizer, allow the redirect
  if (path === '/dashboard/organizer') {
    return NextResponse.next();
  }

  // For company/create route, ensure it's accessible
  if (path === '/dashboard/organizer') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// Check if this file exists and has any forced redirects 