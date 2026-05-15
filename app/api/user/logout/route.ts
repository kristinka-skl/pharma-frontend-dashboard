import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { logErrorResponse } from '@/app/_utils/logger'; 

export async function GET() {
  const cookieStore = await cookies();

  try {
    const token = cookieStore.get('accessToken')?.value;

    if (token) {
      await api.get(
        '/user/logout',        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionId'); 

    return NextResponse.json({ message: 'Signed out successfully' });
  } catch (error: unknown) {
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionId'); 

    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data || error.message,
        'GET /api/user/logout - Axios Error'
      );

      const errorMessage =
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.message;
      const statusCode = error.response?.status || 500;
      
      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }
    
    logErrorResponse(error, 'GET /api/user/logout - Internal Error');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}