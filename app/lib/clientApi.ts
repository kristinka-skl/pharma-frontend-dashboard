// import { LoginFormData, RegisterFormData } from '../types/auth';
// import {
//   Book,
//   BookFormData,
//   deleteReadingSessionRequest,
//   OwnBook,
//   ReadingRequest,
// } from '../types/book';
// import { User } from '../types/user';
import { LoginFormData } from '../types/auth';
import {
  Customer,
  IncomeExpense as IncomeExpense,
  Order,
  Product,
  RecentCustomer as RecentCustomer,
} from '../types/pharma';
import { User } from '../types/user';
import { nextServer } from './api';

// export const register = async (data: RegisterFormData) => {
//   const res = await nextServer.post<User>('/users/signup', data);
//   return res.data;
// };

export const login = async (data: LoginFormData) => {
  const res = await nextServer.post<User>('/user/login', data);
  return res.data;
};

// export const getCurrentUser = async () => {
//   const res = await nextServer.get<User>('/users/current');
//   return res.data;
// };

export const logout = async () => {
  const res = await nextServer.get('/user/logout');
  return res.data;
};

interface FetchDashboardResponse {
  statistics: {
    products: number;
    suppliers: number;
    customers: number;
  };
  recentCustomers: RecentCustomer[];
  incomeExpenses: IncomeExpense[];
}

export async function getDashboard() {
  const { data } = await nextServer.get<FetchDashboardResponse>('/dashboard');
  return data;
}


interface FetchOrdersResponse {
  orders: Order[];
  totalPages: number;
  page: number;
  perPage: number;
}
export async function getOrders(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchOrdersResponse> {
  const { data } = await nextServer.get<FetchOrdersResponse>('/orders', {
    params: {
      page,
      perPage,
      ...(search && { search }),
    },
  });
  return data;
}

interface FetchCustomersResponse {
  customers: Customer[];
  totalPages: number;
  page: number;
  perPage: number;
}

export async function getCustomers(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchCustomersResponse> {
  const { data } = await nextServer.get<FetchCustomersResponse>('/customers', {
    params: {
      page,
      perPage,
      ...(search && { search }),
    },
  });
  return data;
}
interface FetchProductsResponse {
  products: Product[];
  totalPages: number;
  page: number;
  perPage: number;
}
export async function getProducts(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchProductsResponse> {
  const { data } = await nextServer.get<FetchProductsResponse>('/products', {
    params: {
      page,
      perPage,
      ...(search && { search }),
    },
  });
  return data;
}


// export async function addBookFromRecommended(book_id: string) {
//   const { data } = await nextServer.post<Book>(`/books/add/${book_id}`);
//   return data;
// }

// export async function addBook(newBook: BookFormData): Promise<Book> {
//   const { data } = await nextServer.post<Book>('/books/add', newBook);
//   return data;
// }



export async function deleteProduct(product_id: string) {
  const { data } = await nextServer.delete<Product>(`products/${product_id}`);
  return data;
}

// export async function getBookDetails(id: string): Promise<OwnBook> {
//   const { data } = await nextServer.get<OwnBook>(`/books/${id}`);
//   return data;
// }

// export async function startReading(body: ReadingRequest): Promise<OwnBook> {
//   const { data } = await nextServer.post<OwnBook>(`/books/reading/start`, body);
//   return data;
// }

// export async function finishReading(body: ReadingRequest): Promise<OwnBook> {
//   const { data } = await nextServer.post<OwnBook>(
//     `/books/reading/finish`,
//     body
//   );
//   return data;
// }

// export async function deleteReadingSession({
//   readingId,
//   bookId,
// }: deleteReadingSessionRequest): Promise<OwnBook> {
//   const { data } = await nextServer.delete<OwnBook>(`/books/reading`, {
//     params: {
//       readingId,
//       bookId,
//     },
//   });
//   return data;
// }
