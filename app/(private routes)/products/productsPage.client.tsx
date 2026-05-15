'use client';

import { getErrorMessage, perPage } from '@/app/_utils/utils';
import { deleteProduct, getProducts, addProduct, updateProduct } from '@/app/lib/clientApi'; 
import {
  keepPreviousData,
  useMutation,
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
import { Loader } from '@/app/Components/Loader/Loader';

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  
  const search = searchParams.get('search') || undefined;
  const page = Number(searchParams.get('page')) || 1;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isError, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ['products', search, page],
    queryFn: () => getProducts(page, perPage, search),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (id: string) => await deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Successfully deleted!');
    },
    onError: () => {
      toast.error('Sorry, something went wrong. Please try again.');
    },
  });

  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: ProductFormData }) => 
      await updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully!');
      setIsModalOpen(false); 
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  const { mutate: mutateAdd, isPending: isAdding } = useMutation({
    mutationFn: async (newProduct: ProductFormData) => await addProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product added successfully!');
      setIsModalOpen(false);
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    mutateDelete(id); 
  };

  const handleSubmitProduct = (formData: ProductFormData) => {
    const cleanData = {
      name: formData.name,
      category: formData.category,
      stock: Number(formData.stock), 
      suppliers: formData.suppliers,
      price: Number(formData.price),
    };
    if (selectedProduct) {
      mutateUpdate({ id: selectedProduct._id, formData: cleanData }); 
    } else {
      mutateAdd(cleanData); 
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

 if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={css.products}>
      <h1 className={css.visuallyHidden}>Products page</h1>
      <div className={css.searchFormAndActions}>
        <SearchForm placeholder="Product Name" isFiltering={isFetching}/>
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
          onDelete={handleDeleteProduct}
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
        isSubmittingData={isAdding || isUpdating} 
      />
      <Toaster />
    </section>
  );
}