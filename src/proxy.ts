import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files, api, _next
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
