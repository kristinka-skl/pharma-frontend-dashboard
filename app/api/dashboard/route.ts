import { NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/_utils/logger';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api('/dashboard', {
      params: {},
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data || error.message, 
        'GET /api/dashboard - Axios Error'
      );
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 }
      );
    }
    
    logErrorResponse(error, 'GET /api/dashboard - Internal Error');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}