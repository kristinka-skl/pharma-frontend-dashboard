'use client';

import OrdersTable from '@/app/Components/Table/OrdersTable';

import { getOrders } from '@/app/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

export default function OrdersPageClient() {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  console.log('orders:', data);
  return (
    <section>
      <h1>Orders page</h1>
      {isSuccess && 
          <OrdersTable dataList={data.orders} />        
      }
      <Toaster />
    </section>
  );
}
