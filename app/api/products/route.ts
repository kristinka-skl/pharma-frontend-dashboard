import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { ValidationError } from 'yup';
import { productSchema } from '@/app/_utils/validations';
import { logErrorResponse } from '@/app/_utils/logger';
import { perPage } from '@/app/_utils/utils';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const search = request.nextUrl.searchParams.get('search') ?? '';
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);

    const res = await api('/products', {
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
        'GET /api/products - Axios Error'
      );
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 }
      );
    }
    
    logErrorResponse(error, 'GET /api/products - Internal Error');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawBody = await request.json();

    let cleanData;
    try {
      cleanData = await productSchema.validate(rawBody, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        logErrorResponse(error.errors, 'POST /api/products - Validation Failed');
        return NextResponse.json(
          { error: 'Validation failed', details: error.errors },
          { status: 400 }
        );
      }
      
      logErrorResponse(error, 'POST /api/products - Invalid Request Data');
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const res = await api.post('/products', cleanData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data || error.message,
        'POST /api/products - Axios Error'
      );
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 }
      );
    }
    
    logErrorResponse(error, 'POST /api/products - Internal Error');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}