import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ValidationError } from 'yup';
import { supplierSchema } from '@/app/_utils/validations';
import { logErrorResponse } from '@/app/_utils/logger';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let supplierId = 'unknown-id';

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawBody = await request.json();
    const resolvedParams = await params;
    supplierId = resolvedParams.id;

    let cleanData;
    try {
      cleanData = await supplierSchema.validate(rawBody, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        logErrorResponse(
          error.errors, 
          `PUT /api/suppliers/${supplierId} - Validation Failed`
        );
        return NextResponse.json(
          { error: 'Validation failed', details: error.errors },
          { status: 400 }
        );
      }
      
      logErrorResponse(error, `PUT /api/suppliers/${supplierId} - Invalid Request Data`);
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const res = await api.put(`suppliers/${supplierId}`, cleanData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data || error.message, 
        `PUT /api/suppliers/${supplierId} - Axios Error`
      );
      
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 } 
      );
    }
    
    logErrorResponse(error, `PUT /api/suppliers/${supplierId} - Internal Error`);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}