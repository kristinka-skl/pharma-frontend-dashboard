'use client';

import { perPage } from '@/app/_utils/utils';
import { getProducts } from '@/app/lib/clientApi';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './productsPage.module.css';
import SearchForm from '@/app/Components/SearchForm/SearchForm';
import DotsPagination from '@/app/Components/Pagination/DotsPagination';
import ProductsTable from '@/app/Components/Table/ProductsTable';
import { Product, ProductFormData } from '@/app/types/pharma';
import ProductModal from '@/app/Components/Modal/ProductModal';

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const search = searchParams.get('search') || undefined;
  const page = Number(searchParams.get('page')) || 1;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isError, isSuccess } = useQuery({
    queryKey: ['products', search, page],
    queryFn: () => getProducts(page, perPage, search),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleSubmitProduct = async (formData: ProductFormData) => {
    try {
      if (selectedProduct) {
        // await updateProduct(selectedProduct._id, formData);
        toast.success('Product updated successfully!');
      } else {
        // await addProduct(formData);
        toast.success('Product added successfully!');
      }

      queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

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
          <button className={css.addBtn} onClick={handleOpenAddModal}>
            <svg className={css.addBtnIcon} width={18} height={18}>
              <use href="/sprite.svg#icon-plus"></use>
            </svg>
          </button>
          <p>Add a new product</p>
        </div>
      </div>
      {isSuccess && (
        <ProductsTable
          dataList={data.products}
          onEdit={(product: Product) => {
            setSelectedProduct(product);
            setIsModalOpen(true);
          }}
        />
      )}
      {totalPagesFromBackend > 1 && (
        <DotsPagination
          totalPages={totalPagesFromBackend}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedProduct}
        onSubmit={handleSubmitProduct}
      />
      <Toaster />
    </section>
  );
}
