import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_ROUTES } from './constants/public-routes';
import { NEUTRAL_ROUTES } from './constants/neutral-routes';
import { TOKENS } from './constants/tokens';
import { ROUTES_PATH } from './constants/route-path';

export function middleware(request: NextRequest) {
  // Se a rota estiver em NEUTRAL_ROUTES, não faz nada
  if (NEUTRAL_ROUTES.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const currentUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname);

  const hasAccessToken = request.cookies.has(TOKENS.ACCESS_TOKEN);
  const role = request.cookies.get(TOKENS.ROLE)?.value;
  const isAdmin = role === 'admin';

  if (isPublicRoute) {
    if (hasAccessToken) {
      const currentUrlCookie = request.cookies.get(ROUTES_PATH.CURRENT_URL)?.value;
      const redirectTo = currentUrlCookie
        ? currentUrlCookie
        : isAdmin
          ? ROUTES_PATH.ADMIN_HOME
          : ROUTES_PATH.CLIENT_HOME;
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  if (!isPublicRoute) {
    const response = NextResponse.next();
    response.cookies.set(ROUTES_PATH.CURRENT_URL, currentUrl);

    if (!hasAccessToken) {
      const redirect = NextResponse.redirect(new URL('/', request.url));
      redirect.cookies.set(ROUTES_PATH.CURRENT_URL, currentUrl);
      return redirect;
    }

    return response;
  }

  // Caso não se enquadre nas condições acima, segue normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
