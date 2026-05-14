'use client';

import { getErrorMessage, perPage } from '@/app/_utils/utils';
import { getSuppliers, updateSupplier, addSupplier } from '@/app/lib/clientApi'; 
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './suppliersPage.module.css';
import SearchForm from '@/app/Components/SearchForm/SearchForm';
import DotsPagination from '@/app/Components/Pagination/DotsPagination';

import { Supplier, SupplierFormData } from '@/app/types/pharma';
import SuppliersTable from '@/app/Components/Table/SuppliersTable';
import SupplierModal from '@/app/Components/Modal/SupplierModal';


export default function SuppliersPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  
  const search = searchParams.get('search') || undefined;
  const page = Number(searchParams.get('page')) || 1;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ['suppliers', search, page],
    queryFn: () => getSuppliers(page, perPage, search),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: SupplierFormData }) => 
      await updateSupplier(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Supplier updated successfully!');
      setIsModalOpen(false); 
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });

  const { mutate: mutateAdd, isPending: isAdding } = useMutation({
    mutationFn: async (newSupplier: SupplierFormData) => await addSupplier(newSupplier),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Supplier added successfully!');
      setIsModalOpen(false);
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
  const handleOpenAddModal = () => {
    setSelectedSupplier(null);
    setIsModalOpen(true);
  };

  const handleSubmitSupplier = (formData: SupplierFormData) => {
    const cleanData = {
      name: formData.name,
      address: formData.address,
      amount: Number(formData.amount), 
      suppliers: formData.suppliers,
      date: formData.date,
      status: formData.status
    };
    if (selectedSupplier) {
      mutateUpdate({ id: selectedSupplier._id, formData: cleanData }); 
    } else {
      mutateAdd(cleanData); 
    }
  };

  useEffect(() => {
    if (isSuccess && data?.suppliers?.length === 0) {
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
    return 
     // <Loader />;
  }

  return (
    <section className={css.suppliers}>
      <h1 className={css.visuallyHidden}>Suppliers page</h1>
      <div className={css.searchFormAndActions}>
        <SearchForm placeholder="User Name" />
        <div className={css.actions}>
          <button className={css.addBtn} onClick={handleOpenAddModal}>
            <svg className={css.addBtnIcon} width={18} height={18}>
              <use href="/sprite.svg#icon-plus"></use>
            </svg>
          </button>
          <p>Add a new supplier</p>
        </div>
      </div>
      
      {isSuccess && (
        <SuppliersTable
          dataList={data.suppliers}
          onEdit={(supplier: Supplier) => {
            setSelectedSupplier(supplier);
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

      
      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedSupplier}
        onSubmit={handleSubmitSupplier}
        isSubmittingData={isAdding || isUpdating} 
      />
      <Toaster />
    </section>
  );
}