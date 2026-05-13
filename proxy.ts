import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from './app/api/api';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const publicRoutes = ['/login'];

export async function proxy(request: NextRequest) {
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken'); 
  
  if (accessToken) {
    if (!isPublicRoute || !(await isValidAccessToken(cookieStore)))
      return NextResponse.next();
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (refreshToken) {
    return NextResponse.next();
  }

  if (isPublicRoute) return NextResponse.next(); 
  return NextResponse.redirect(new URL('/login', request.url)); 
}


async function isValidAccessToken(cookieStore: ReadonlyRequestCookies) {
  try {
    const res = await api.get('/user/user-info', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if(res)
      return true;
    else throw Error;  
  } catch {
    return false;
  }
}

export const config = {
  matcher: [
    '/products/:path*',
    '/customers/:path*',
    '/orders/:path*',
    '/suppliers/:path*',    
    '/dashboard',    
  ],
};