import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
// import { logErrorResponse } from '../_utils/utils';

export async function GET(request: NextRequest) {
  try {
    
    const cookieStore = await cookies();
    console.log('cookieStore:', cookieStore)
    console.log('cookieStore.toString() = ', cookieStore.toString())
    const search = request.nextUrl.searchParams.get('search') ?? '';
    // const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    // const rawTag = request.nextUrl.searchParams.get('tag') ?? '';
    // const tag = rawTag === 'All' ? '' : rawTag;

    const res = await api('/customers', {
      params: {
        ...(search !== '' && { search }),
        // page,
        // perPage: 12,
        // ...(tag && { tag }),
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
    //   logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    // logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

