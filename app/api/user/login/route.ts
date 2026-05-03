import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parse } from 'cookie';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const apiRes = await api.post('/user/login', body);
    const cookieStore = await cookies();
    const cookieSet = apiRes.headers['set-cookie'];
    console.log('apiRes.headers[set-cookie]:', cookieSet);
    
 if (cookieSet) {
	    // Якщо set-cookie — масив, беремо як є, інакше примусово робимо масив
	    const cookieArray = Array.isArray(cookieSet) ? cookieSet : [cookieSet];
	    // Проходимо по кожному cookie
	    for (const cookieStr of cookieArray) {
	      const parsed = parse(cookieStr);
	      // Створюємо опції для cookie
	      const options = {
	        expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
	        path: parsed.Path,
	        maxAge: Number(parsed['Max-Age']),
	      };
	      // Встановлюємо токени
	      if (parsed.accessToken) {
	        cookieStore.set('accessToken', parsed.accessToken, options);
	      }
	      if (parsed.refreshToken) {
	        cookieStore.set('refreshToken', parsed.refreshToken, options);
	      }
	    }
      const cookieStoreA = await cookies();
      console.log('cookieStoreA:', cookieStoreA)
	    return NextResponse.json(apiRes.data);
	  }
	  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error(
        'Registration error:',
        error.response?.data || error.message
      );

      const errorMessage =
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.message;

      const statusCode = error.response?.status || 500;

      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }

    console.error('Unknown error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

