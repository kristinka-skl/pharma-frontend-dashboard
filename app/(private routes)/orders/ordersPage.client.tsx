'use client';

import OrdersTable from '@/app/Components/Table/OrdersTable';
import css from './ordersPage.module.css';
import { getOrders } from '@/app/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import SearchForm from '@/app/Components/SearchForm/SearchForm';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'; 
import { useEffect } from 'react';
import DotsPagination from '@/app/Components/Pagination/DotsPagination';
import { perPage } from '@/app/_utils/utils';
import { Loader } from '@/app/Components/Loader/Loader';

export default function OrdersPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get('search') || undefined;
  const page = Number(searchParams.get('page')) || 1;

  const { data, isError, error, refetch, isSuccess, isLoading, isFetching } = useQuery({
    
    queryKey: ['orders', search, page], 
    
    queryFn: () => getOrders(page, perPage, search), 
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  useEffect(() => {    
    if (isSuccess && data?.orders?.length === 0) {
      toast.error('Nothing was found');
    }
  }, [data, isSuccess]);

  const totalPagesFromBackend = data?.totalPages || 0;
  
  const handlePageChange = (newPage: number) => {    
    const params = new URLSearchParams(searchParams.toString());    
    params.set('page', newPage.toString());    
    router.push(`${pathname}?${params.toString()}`);
  };

 if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={css.ordersSection}>
      <h1 className={css.visuallyHidden}>Orders page</h1>
      <SearchForm placeholder="User Name" isFiltering={isFetching}/>
      {isError && (
        <div className={css.errorContainer}>
          <p className={css.errorMessage}>
            Oops! Failed to load orders. {error instanceof Error ? error.message : ''}
          </p>
          <button onClick={() => refetch()} className={css.retryBtn}>
            Try again
          </button>
        </div>
      )}

      {isSuccess && !isError && <OrdersTable dataList={data.orders} />}
      
     
      {isSuccess && !isError && totalPagesFromBackend > 1 && (
        <DotsPagination 
          totalPages={totalPagesFromBackend} 
          currentPage={page} 
          onPageChange={handlePageChange}
        />
      )}
      
      <Toaster />
    </section>
  );
}