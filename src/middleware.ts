import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that should not be rewritten (static assets, API, etc.)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Detect if user is on mobile
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);

  // Define the target prefix based on the device
  const prefix = isMobile ? '/mobile-view' : '/desktop-view';

  // If the user manually navigates to /mobile-view or /desktop-view directly,
  // we could optionally redirect them to the clean URL, but for now we just
  // rewrite all clean URLs to their internal folder structure.
  if (!pathname.startsWith('/mobile-view') && !pathname.startsWith('/desktop-view')) {
    const url = request.nextUrl.clone();
    url.pathname = `${prefix}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files, api, _next
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
