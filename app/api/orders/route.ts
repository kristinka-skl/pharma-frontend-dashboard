import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { perPage } from '@/app/_utils/utils';
import { logErrorResponse } from '@/app/_utils/logger';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const search = request.nextUrl.searchParams.get('search') ?? '';
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);

    const res = await api('/orders', {
      params: {
        ...(search !== '' && { search }),
        page,
        perPage,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data || error.message, 
        'GET /api/orders - Axios Error'
      );
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 }
      );
    }
    
    logErrorResponse(error, 'GET /api/orders - Internal Error');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}