import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Handle API forwarding for /v1 routes
  if (request.nextUrl.pathname.startsWith('/v1')) {
    const api_url =
      process.env.NODE_ENV === 'production'
        ? process.env.API_URL
        : process.env.DEV_API_URL;

    const url = new URL(api_url + request.nextUrl.pathname + request.nextUrl.search);

    console.log('-> (m)forwarding-url /api:', url.toString());
    return NextResponse.rewrite(url.toString(), {
      headers: {
        ...request.headers,
      },
    });
  }

  // Handle /sign-in route
  if (request.nextUrl.pathname === '/sign-in') {
    if (token) {
      // Redirect to home if token exists
      console.log('-> (m)token exists, redirecting to /');
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Allow access to /sign-in if no token exists
    console.log('-> (m)no token, allowing access to /sign-in');
    return NextResponse.next();
  }

  // Redirect to /sign-in if no token exists for other routes
  if (!token) {
    console.log('-> (m)token missing, redirecting to /sign-in...');
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow authenticated users to access other routes
  console.log('-> (m)token exists, allowing request to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Include API routes explicitly
    '/v1/:path*',
    '/sign-in',
  ],
};
