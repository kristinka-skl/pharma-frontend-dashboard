import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { ValidationError } from 'yup';
import { productSchema } from '@/app/_utils/validations';
import { logErrorResponse } from '@/app/_utils/logger';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let productId = 'unknown-id';

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawBody = await request.json();
    const resolvedParams = await params;
    productId = resolvedParams.id;

    let cleanData;
    try {
      cleanData = await productSchema.validate(rawBody, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        logErrorResponse(
          error.errors,
          `PUT /api/products/${productId} - Validation Failed`
        );
        return NextResponse.json(
          { error: 'Validation failed', details: error.errors },
          { status: 400 }
        );
      }
      
      logErrorResponse(error, `PUT /api/products/${productId} - Invalid Request Data`);
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const res = await api.put(`products/${productId}`, cleanData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data || error.message,
        `PUT /api/products/${productId} - Axios Error`
      );
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? error.response?.status ?? 500 }
      );
    }
    
    logErrorResponse(error, `PUT /api/products/${productId} - Internal Error`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let productId = 'unknown-id';

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    productId = resolvedParams.id;

    const res = await api.delete(`products/${productId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(
        error.response?.data || error.message,
        `DELETE /api/products/${productId} - Axios Error`
      );
      
      const errorMessage = error.response?.data?.message || error.message;
      return NextResponse.json(
        { error: errorMessage },
        { status: error.status ?? error.response?.status ?? 500 }
      );
    }
    
    logErrorResponse(error, `DELETE /api/products/${productId} - Internal Error`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}