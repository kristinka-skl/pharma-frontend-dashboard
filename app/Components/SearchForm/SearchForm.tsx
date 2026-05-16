import { yupResolver } from '@hookform/resolvers/yup';
import css from './SearchForm.module.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { SearchFormData } from '@/app/types/pharma';
import toast from 'react-hot-toast';
import { ApiError } from '@/app/api/api';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SearchFormProps {
  placeholder: string;
  isFiltering?: boolean;
}

const schema = yup.object({
  name: yup.string().trim().default('')
});

export default function SearchForm({placeholder, isFiltering}: SearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<SearchFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SearchFormData) => {
    try {  

      const params = new URLSearchParams(searchParams);

      if (data.name) {
        params.set('search', data.name);
        params.delete('page');    
    }
      else params.delete('search');

      router.replace(
        `${pathname}?${params.toString()}`, { scroll: false }
      );

      
    } catch (error) {
      const errorMessage =
        (error as ApiError).response?.data?.error ??
        (error as ApiError).message ??
        'Oops... some error';

      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.fieldWrapper}>
        <div
          className={`${css.inputGroup} ${
            errors.name ? css.hasError : dirtyFields.name ? css.isSuccess : ''
          }`}
        >
          <input
            id="name"
            aria-label='name to search'
            className={css.input}
            {...register('name')}
            placeholder={placeholder}
            disabled={isFiltering}
          />
        </div>
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div className={css.actions}>
        <button aria-label='search' type="submit" className={css.submitBtn} disabled={isSubmitting || isFiltering}>
          <svg className={css.filterIcon}>
            <use href="/sprite.svg#icon-filter" aria-hidden='true'></use>
          </svg>
          {isFiltering ? 'Filtering...' : 'Filter'}
        </button>
      </div>
    </form>
  );
}
