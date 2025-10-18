import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Redirect from /dashboard/home to /dashboard/
  if (request.nextUrl.pathname === '/dashboard/home') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // If accessing /dashboard/, continue without redirecting to /dashboard/home
  if (request.nextUrl.pathname === '/dashboard') {
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard', '/dashboard/home'],
}