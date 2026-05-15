import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { logErrorResponse } from '@/app/_utils/logger'; 

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data, status } = await api.get('/user/user-info', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data, { status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data || error.message,
        'GET /api/user/user-info - Axios Error'
      );

      const errorMessage =
        error.response?.data?.error ??
        error.response?.data?.message ??
        error.message;

      const statusCode = error.response?.status ?? error.status ?? 500;

      return NextResponse.json(
        { error: errorMessage },
        { status: statusCode }
      );
    }

    logErrorResponse(error, 'GET /api/user/user-info - Internal Error');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}