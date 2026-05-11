'use client';

import OrdersTable from '@/app/Components/Table/OrdersTable';
import css from './ordersPage.module.css'
import { getOrders } from '@/app/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import SearchForm from '@/app/Components/SearchForm/SearchForm';
import { useSearchParams } from 'next/navigation';

export default function OrdersPageClient() {

  const searchParams = useSearchParams();

  const search = searchParams.get('search') || undefined;
  const { data, isError, isSuccess } = useQuery({
    queryKey: ['orders', search],
    queryFn: () => getOrders(search),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  console.log('orders:', data);
  return (
    <section className={css.ordersSection}>
      <h1 className={css.visuallyHidden}>Orders page</h1>
      <SearchForm placeholder='User Name' />
      {isSuccess && 
          <OrdersTable dataList={data.orders} />        
      }
      <Toaster />
    </section>
  );
}
