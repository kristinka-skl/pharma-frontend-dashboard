import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { perPage } from '@/app/_utils/utils';
import { ValidationError } from 'yup';

import { logErrorResponse } from '@/app/_utils/logger'; 
import { supplierSchema } from '@/app/_utils/validations';


export async function GET(request: NextRequest) {
  try {
    
    const cookieStore = await cookies();
    const search = request.nextUrl.searchParams.get('search') ?? '';
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);


    const res = await api('/suppliers', {
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
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
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
      cleanData = await supplierSchema.validate(rawBody, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {        
        logErrorResponse(error.errors, 'POST /api/suppliers - Validation Failed');
        
        return NextResponse.json(
          { error: 'Validation failed', details: error.errors },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const res = await api.post('/suppliers', cleanData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data || error.message, 'POST /api/suppliers - Axios Error');
      
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? 500 }
      );
    }
    
    logErrorResponse(error, 'POST /api/suppliers - Internal Error');
    
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
