'use client';

import { perPage } from '@/app/_utils/utils';
import { getProducts } from '@/app/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './productsPage.module.css'
import SearchForm from '@/app/Components/SearchForm/SearchForm';
import DotsPagination from '@/app/Components/Pagination/DotsPagination';
import ProductsTable from '@/app/Components/Table/ProductsTable';

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
  
    const search = searchParams.get('search') || undefined;
    const page = Number(searchParams.get('page')) || 1;

  const { data, isError, isSuccess } = useQuery({
    queryKey: ['products', search, page],
    queryFn: () => getProducts(page, perPage, search),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });


  useEffect(() => {    
    if (isSuccess && data?.products?.length === 0) {
      toast.error('Nothing was found');
    }
  }, [data, isSuccess]);

  const totalPagesFromBackend = data?.totalPages || 0;

  const handlePageChange = (newPage: number) => {    
    const params = new URLSearchParams(searchParams.toString());    
    params.set('page', newPage.toString());    
    router.push(`${pathname}?${params.toString()}`);
  };

  console.log('products:', data);
  return (
    <section className={css.products}>
      <h1 className={css.visuallyHidden}>Customers page</h1>
      <div className={css.searchFormAndActions}>
      <SearchForm placeholder="Product Name" />
      <div className={css.actions}>
        <button className={css.addBtn}>
            <svg className={css.addBtnIcon} width={18} height={18}>
                <use href='/sprite.svg#icon-plus'></use>
            </svg>
        </button>
        <p>Add a new product</p>
      </div>
      </div>
      {isSuccess && 
          <ProductsTable dataList={data.products} />
        }
        {totalPagesFromBackend > 1 && (
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
