'use client';

import CustomersTable from '@/app/Components/Table/CustomersTable';
import { getCustomers } from '@/app/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

export default function CustomersPageClient() {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  console.log('customers:', data);
  return (
    <section>
      <h1>Customers page</h1>
      {isSuccess && 
          <CustomersTable dataList={data.customers} />
        }
      <Toaster />
    </section>
  );
}
