import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  console.log('\n-> (m)request url =>', request.nextUrl.toString());

  // request forwarding for /api
  if (request.nextUrl.pathname.startsWith('/api')) {
    // const api_url = process.env.DEV_API_URL
    const api_url =
      process.env.NODE_ENV === "production"
        ? process.env.API_URL
        : process.env.DEV_API_URL

    const url = new URL(api_url + request.nextUrl.pathname + request.nextUrl.search)

    console.log('-> (m)forwaring-url /api:', url.toString());
    return NextResponse.rewrite(url.toString(), {
      request,
      headers: {
        ...request.headers,
      },
      statusText: "Rewriting to API",
    })
  }


  return NextResponse.next();
}

export const config = {
  // matcher: [
  //   '/((?!_next/static|_next/image|favicon.ico).*)',
  // ],
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}