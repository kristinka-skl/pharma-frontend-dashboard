export type Order = {    
    name: string,
    photo: string,
    address: string,
    products: string,
    price: string,
    status: string,
    order_date: string,
}

export type Customer = {    
    name: string,
    image: string,
    photo?: string,
    email: string,
    address: string,
    phone: string,
    spent: string,
    register_date: string,
}

export interface RecentCustomer {
  name: string;
  email: string;
  spent: number;
  photo?: string;
  image?: string,
  address?: string;
  phone?: string;
  register_date?: string;
}

export interface IncomeExpense {
  type: string;
  name: string;
  amount: string;
}

export type TransactionType = 'Income' | 'Expense' | 'Error'; 

export type SearchFormData = {
    name: string
}

export interface Product{
    _id: string,
    name: string,    
    id: string,
    suppliers: string,
    price: number,
    stock: number,
    category: string,
}

export interface ProductFormData {
    
  name: string;
  category: string;
  stock: number;
  suppliers: string;
  price: number;
}