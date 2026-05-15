import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios'; 
import { api } from '../../api';
import { parse } from 'cookie';
import { logErrorResponse } from '@/app/_utils/logger'; 

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken) {
    try {
      const apiRes = await api.post(
        'user/refresh', 
        {},
        {
          headers: {
            Cookie: cookieStore.toString(), 
          },
        }
      );

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

      logErrorResponse(
        'No cookies returned during token refresh',
        'POST /api/user/refresh - Missing Cookies'
      );
      return NextResponse.json({ success: false }, { status: 401 });

    } catch (error: unknown) {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      cookieStore.delete('sessionId');

      if (isAxiosError(error)) {
        logErrorResponse(
          error.response?.data || error.message,
          'POST /api/user/refresh - Axios Error'
        );
        return NextResponse.json({ success: false, error: 'Session expired' }, { status: 401 }); 
      }

      logErrorResponse(error, 'POST /api/user/refresh - Internal Error');
      return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 }); 
    }
  }

  return NextResponse.json({ success: false, error: 'No tokens provided' }, { status: 401 });
}