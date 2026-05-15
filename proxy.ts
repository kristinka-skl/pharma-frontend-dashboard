import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken && !refreshToken && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublicRoute && (accessToken || refreshToken)) {
    const isValid = await isValidAccessToken(request.cookies.toString());
    
    if (isValid) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

async function isValidAccessToken(cookieHeader: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/user/user-info`, {
      method: 'GET',
      headers: {
        'Cookie': cookieHeader,
      },
    });
    
    return res.ok;
  } catch (error) {
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
    '/login' 
  ],
};