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
  // onFilterClick: (data: SearchFormData) => void,
}

const schema = yup.object({
  name: yup.string().trim().required(),
});

export default function SearchForm({
  placeholder,
  // onFilterClick
}: SearchFormProps) {
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
      //   const res = onFilterClick(data);

      const params = new URLSearchParams(searchParams);

      if (data.name) params.set('search', data.name);
      else params.delete('name');

      router.replace(
        `${pathname}?${params.toString()}`
        //   { scroll: false }
      );

      //   if (res) {

      //     toast.success('Login successful!');

      //   } else {
      //     toast.error('Invalid email or password');
      //   }
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
            className={css.input}
            {...register('name')}
            placeholder={placeholder}
          />
        </div>
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
          <svg className={css.filterIcon}>
            <use href="/sprite.svg#icon-filter"></use>
          </svg>
          {isSubmitting ? 'Filtering...' : 'Filter'}
        </button>
      </div>
    </form>
  );
}
