'use client';

import { perPage } from '@/app/_utils/utils';
import CustomersTable from '@/app/Components/Table/CustomersTable';
import { getCustomers } from '@/app/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './customersPage.module.css';
import SearchForm from '@/app/Components/SearchForm/SearchForm';
import DotsPagination from '@/app/Components/Pagination/DotsPagination';
import { Loader } from '@/app/Components/Loader/Loader';

export default function CustomersPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get('search') || undefined;
  const page = Number(searchParams.get('page')) || 1;

  const { data, isError, error, refetch, isSuccess, isLoading, isFetching } =
    useQuery({
      queryKey: ['customers', search, page],
      queryFn: () => getCustomers(page, perPage, search),
      placeholderData: keepPreviousData,
      refetchOnMount: false,
    });

  useEffect(() => {
    if (isSuccess && data?.customers?.length === 0) {
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
    <section className={css.customersSection}>
      <h1 className={css.visuallyHidden}>Customers page</h1>
      <SearchForm placeholder="User Name" isFiltering={isFetching} />

      {isError && (
        <div className={css.errorContainer}>
          <p className={css.errorMessage}>
            Oops! Failed to load customers.
            {error instanceof Error ? error.message : ''}
          </p>
          <button onClick={() => refetch()} className={css.retryBtn}>
            Try again
          </button>
        </div>
      )}

      {isSuccess && <CustomersTable dataList={data.customers} />}
      {isSuccess && totalPagesFromBackend > 1 && (
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
