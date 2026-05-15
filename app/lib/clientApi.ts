
import { LoginFormData } from '../types/auth';
import {
  Customer,
  IncomeExpense as IncomeExpense,
  Order,
  Product,
  ProductFormData,
  RecentCustomer as RecentCustomer,
  Supplier,
  SupplierFormData,
} from '../types/pharma';
import { User } from '../types/user';
import { nextServer } from './api';

export const login = async (data: LoginFormData) => {
  const res = await nextServer.post<User>('/user/login', data);
  return res.data;
};

export const getMe = async () => {
  const res = await nextServer.get<User>('/user/user-info');
  return res.data;
};

export const logout = async () => {
  const res = await nextServer.get('/user/logout');
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  try {
    const res = await nextServer.post<CheckSessionRequest>('/user/refresh');
    return res.data.success;
  } catch (error) {
    console.error('Check session failed');
    return false; 
  }
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

export async function addProduct(newProduct: ProductFormData): Promise<Product> {
  const { data } = await nextServer.post<Product>('/products', newProduct);
  return data;
}

export async function updateProduct(product_id: string, formData: ProductFormData){
  const { data } = await nextServer.put<Product>(`products/${product_id}`, formData);
  return data;
}


export async function deleteProduct(product_id: string) {
  const { data } = await nextServer.delete<Product>(`products/${product_id}`);
  return data;
}

interface FetchSuppliersResponse {
  suppliers: Supplier[];
  totalPages: number;
  page: number;
  perPage: number;
}
export async function getSuppliers(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchSuppliersResponse> {
  const { data } = await nextServer.get<FetchSuppliersResponse>('/suppliers', {
    params: {
      page,
      perPage,
      ...(search && { search }),
    },
  });
  return data;
}
export async function addSupplier(newSupplier: SupplierFormData): Promise<Supplier> {
  const { data } = await nextServer.post<Supplier>('/suppliers', newSupplier);
  return data;
}

export async function updateSupplier(supplier_id: string, formData: SupplierFormData){
  const { data } = await nextServer.put<Supplier>(`suppliers/${supplier_id}`, formData);
  return data;
}

