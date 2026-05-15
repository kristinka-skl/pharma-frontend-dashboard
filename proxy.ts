// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { api } from './app/api/api';
// import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// const publicRoutes = ['/login'];

// export async function proxy(request: NextRequest) {
//   const isPublicRoute = publicRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   );
  
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken');
//   const refreshToken = cookieStore.get('refreshToken'); 
  
//   if (accessToken) {
//     if (!isPublicRoute || !(await isValidAccessToken(cookieStore)))
//       return NextResponse.next();
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   if (refreshToken) {
//     return NextResponse.next();
//   }

//   if (isPublicRoute) return NextResponse.next(); 
//   return NextResponse.redirect(new URL('/login', request.url)); 
// }


// async function isValidAccessToken(cookieStore: ReadonlyRequestCookies) {
//   try {
//     const res = await api.get('/user/user-info', {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });
//     if(res)
//       return true;
//     else throw Error;  
//   } catch {
//     return false;
//   }
// }

// export const config = {
//   matcher: [
//     '/products/:path*',
//     '/customers/:path*',
//     '/orders/:path*',
//     '/suppliers/:path*',    
//     '/dashboard',    
//   ],
// };


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