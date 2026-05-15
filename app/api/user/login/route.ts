import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parse } from 'cookie';
import { logErrorResponse } from '@/app/_utils/logger'; 

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const apiRes = await api.post('/user/login', body);
    const cookieStore = await cookies();
    const cookieSet = apiRes.headers['set-cookie'];    

    if (cookieSet) {
      const cookieArray = Array.isArray(cookieSet) ? cookieSet : [cookieSet];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed['Max-Age']),
        };
        if (parsed.accessToken) {
          cookieStore.set('accessToken', parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set('refreshToken', parsed.refreshToken, options);
        }
        if (parsed.sessionId) {
          cookieStore.set('sessionId', parsed.sessionId, options);
        }
      }

      return NextResponse.json(apiRes.data);
    }
    
    logErrorResponse('No cookies returned from backend', 'POST /api/user/login - Missing Cookies');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data || error.message,
        'POST /api/user/login - Axios Error'
      );

      const errorMessage =
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.message;

      const statusCode = error.response?.status || 500;

      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }

    logErrorResponse(error, 'POST /api/user/login - Internal Error');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}