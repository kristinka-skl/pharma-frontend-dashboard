'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material';

import css from './ProductModal.module.css';
import { Product, ProductFormData } from '@/app/types/pharma';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Product | null;
  onSubmit: (data: ProductFormData) => Promise<void> | void;
  isSubmittingData: boolean;
}

const CATEGORIES = [
  'Medicine',
  'Head',
  'Hand',
  'Dental Care',
  'Skin Care',
  'Eye Care',
  'Vitamins & Supplements',
  'Orthopedic Products',
  'Baby Care',
];
const MAX_PRICE = 10000000;
const MAX_STOCK = 1000000;
const MAX_STRING = 1000;

const schema = yup.object({
  name: yup
    .string()
    .max(MAX_STRING, 'Max 1000 characters')
    .required('Required'),
  category: yup.string().required('Required').oneOf(CATEGORIES, 'Required'),
  stock: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'Min 0')
    .max(MAX_STOCK, `Max stock is ${MAX_STOCK}`)
    .required('Required'),
  suppliers: yup
    .string()
    .max(MAX_STRING, 'Max 1000 characters')
    .required('Required'),
  price: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be > 0')
    .max(MAX_PRICE, `Max price is ${MAX_PRICE}`)
    .required('Required'),
});

const COLORS = {
  green: 'var(--accent)',
  error: 'var(--accent-2)',
  lightGray: '#F5F5F5',
  borderDefault: 'rgba(29, 30, 33, 0.1)',
  textSecondary: 'var(--text)',
};

const getInputSx = (isDirty: boolean, hasError: boolean) => ({
  position: 'relative',
  '& .MuiOutlinedInput-root': {
    borderRadius: '60px',
    backgroundColor: '#fff',
    fontSize: '12px',
    '& fieldset': {
      borderColor: hasError
        ? COLORS.error
        : isDirty
          ? COLORS.green
          : COLORS.borderDefault,
      transition: 'border-color 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: hasError ? COLORS.error : COLORS.green,
    },
    '&.Mui-focused fieldset': {
      borderColor: hasError ? COLORS.error : COLORS.green,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '13px 18px',
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '4px',
    right: '18px',
    margin: 0,
    fontSize: '11px',
    lineHeight: 1,
    color: COLORS.error,
    pointerEvents: 'none',
  },
});

export default function ProductModal({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  isSubmittingData,
}: ProductModalProps) {
  const isEditMode = Boolean(initialData);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        initialData || {
          name: '',
          category: '',
          stock: 0,
          suppliers: '',
          price: 0,
        }
      );
    }
  }, [isOpen, initialData, reset]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}      
      slotProps={{
        paper: {
          sx: {
            width: { xs: '335px', md: '536px' },
            maxWidth: { xs: 'calc(100% - 32px)', sm: 'none' },
            borderRadius: '12px',
            padding: { xs: '40px 20px', md: '40px' },
            margin: '0',
            boxShadow: 'none',
          },
        },
      }}
    >
      <DialogTitle className={css.header}>
        <Typography className={css.modalTitle}>
          {isEditMode ? 'Edit product' : 'Add a new product'}
        </Typography>
        <button className={css.closeBtn} onClick={onClose} type="button">
          <svg className={css.closeBtnIcon} width="32" height="32">
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </DialogTitle>

      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
          onClose();
        })}
      >
        <DialogContent className={css.flexContainer}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="Product Info"
                fullWidth
                sx={getInputSx(fieldState.isDirty, !!fieldState.error)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                fullWidth
                sx={getInputSx(fieldState.isDirty, !!fieldState.error)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                slotProps={{
                  select: {
                    displayEmpty: true,
                    renderValue: (value: unknown) =>
                      (value as string) || (
                        <Typography
                          sx={{ color: COLORS.textSecondary, fontSize: '12px' }}
                        >
                          Category
                        </Typography>
                      ),
                    MenuProps: {
                      slotProps: {
                        paper: {
                          sx: {
                            height: '140px',
                            marginTop: '8px',
                            boxShadow: 'none',
                            bgcolor: COLORS.green,
                            color: 'white',
                            borderRadius: '12px',
                            '& .MuiMenuItem-root:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                            },
                            '&::-webkit-scrollbar': {
                              width: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                              backgroundColor: 'transparent',
                              marginTop: '8px',
                              marginBottom: '8px',
                            },

                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: 'rgba(255, 255, 255, 0.4)',
                              borderRadius: '10px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            },
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Category
                </MenuItem>
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="stock"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="number"
                placeholder="Stock"
                fullWidth
                slotProps={{
                  htmlInput: {
                    max: MAX_STOCK,
                    maxLength: 8,
                  },
                }}
                sx={getInputSx(fieldState.isDirty, !!fieldState.error)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="suppliers"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="Suppliers"
                fullWidth
                sx={getInputSx(fieldState.isDirty, !!fieldState.error)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="number"
                placeholder="Price"
                fullWidth
                slotProps={{
                  htmlInput: {
                    max: MAX_PRICE,
                    maxLength: 8,
                  },
                }}
                sx={getInputSx(fieldState.isDirty, !!fieldState.error)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </DialogContent>

        <div className={css.actions}>
          <button
            type="submit"
            className={`${css.baseBtn} ${css.submitBtn}`}
            disabled={isSubmitting}
          >
            {isSubmittingData
              ? isEditMode
                ? 'Saving...'
                : 'Adding...'
              : isEditMode
                ? 'Save'
                : 'Add'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className={`${css.baseBtn} ${css.cancelBtn}`}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </Dialog>
  );
}
