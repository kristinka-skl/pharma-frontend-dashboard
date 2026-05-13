import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parse } from 'cookie';

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;


  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken) {

    try {
      const apiRes = await api.post('user/refresh', {},
        
         {
        headers: {
          Cookie: cookieStore.toString(), 
        },
      });

      const setCookie = apiRes.headers['set-cookie'];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          if (parsed.sessionId) cookieStore.set('sessionId', parsed.sessionId, options);
        }
        return NextResponse.json({ success: true });
      }
    } catch (error) {

      console.error('Refresh token failed:', error);

      return NextResponse.json({ success: false }, { status: 401 }); 
    }
  }


  return NextResponse.json({ success: false }, { status: 401 });
}