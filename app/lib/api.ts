import axios from 'axios';

export const nextServer = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || '') + '/api',
  withCredentials: true,
});

nextServer.interceptors.response.use(
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

    try {
      await nextServer.post('/user/refresh');
      return nextServer(originalRequest);
      
    } catch (refreshError) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(refreshError);
    }
  }
);
