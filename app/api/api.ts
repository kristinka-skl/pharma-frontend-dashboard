import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export type ApiError = AxiosError<{
  error?: string;
  message?: string;
  response?: {
    message: string;
  };
}>;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : 'http://localhost:3000/api',
  withCredentials: true,
});
console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest.url === '/user/refresh' ||
      originalRequest._isRetry
    ) {
      return Promise.reject(error);
    }

    originalRequest._isRetry = true;

    const isRefreshed = await refreshServerSession();

    if (!isRefreshed) {
      return Promise.reject(error);
    }

    const cookieStore = await cookies();
    originalRequest.headers.Cookie = cookieStore.toString();

    return api(originalRequest);
  }
);

async function refreshServerSession() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const sessionId = cookieStore.get('sessionId')?.value;

    if (!refreshToken || !sessionId) return false;

    const res = await api.post(
      '/user/refresh',
      { sessionId, refreshToken },
      {
        headers: { Cookie: cookieStore.toString() },
      }
    );

    const setCookie = res.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const maxAgeStr = parsed['Max-Age'] || parsed['max-age'];
        const maxAge = maxAgeStr ? Number(maxAgeStr) : undefined;

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path || '/',
          ...(maxAge !== undefined && !isNaN(maxAge) && { maxAge }),
        };

        if (parsed.accessToken)
          cookieStore.set('accessToken', parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set('refreshToken', parsed.refreshToken, options);
        if (parsed.sessionId)
          cookieStore.set('sessionId', parsed.sessionId, options);
      }
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}
