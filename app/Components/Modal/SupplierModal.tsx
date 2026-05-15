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
import { Supplier, SupplierFormData } from '@/app/types/pharma';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useSupplierDraftStore } from '@/app/store/supplierDraftStore';
import {
  MAX_AMOUNT,
  MAX_STRING,
  STATUS,
  supplierSchema,
} from '@/app/_utils/validations';

interface SupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Supplier | null;
  onSubmit: (data: SupplierFormData) => Promise<Supplier> | void;
  isSubmittingData: boolean;
}

const COLORS = {
  green: 'var(--accent)',
  error: 'var(--accent-2)',
  lightGray: '#F5F5F5',
  borderDefault: 'rgba(29, 30, 33, 0.1)',
  textSecondary: 'rgba(29, 30, 33, 0.4)',
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
  '& .MuiPickersOutlinedInput-root': {
    borderRadius: '60px',
    backgroundColor: '#fff',
    fontSize: '12px',
    height: '44px',
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
      borderColor: `${hasError ? COLORS.error : COLORS.green} !important`,
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

export default function SupplierModal({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  isSubmittingData,
}: SupplierModalProps) {
  const isEditMode = Boolean(initialData);
  const setDraft = useSupplierDraftStore((state) => state.setDraft);
  const clearDraft = useSupplierDraftStore((state) => state.clearDraft);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<SupplierFormData>({
    resolver: yupResolver(supplierSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: '',
      amount: 0,
      suppliers: '',
      date: '',
      status: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialData) {
        reset(initialData);
      } else {
        const savedDraft = useSupplierDraftStore.getState().draft;
        reset(savedDraft);
      }
    }
  }, [isOpen, initialData, isEditMode, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (!isEditMode) {
        setDraft(value as SupplierFormData);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, isEditMode, setDraft]);

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
          {isEditMode ? 'Edit supplier' : 'Add a new supplier'}
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
          if (!isEditMode) {
            clearDraft();
          }
          onClose();
        })}
      >
        <DialogContent
          className={css.flexContainer}
          sx={{ p: 0, overflow: 'visible' }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="Suppliers Info"
                fullWidth
                slotProps={{
                  htmlInput: {
                    maxLength: MAX_STRING,
                  },
                }}
                sx={getInputSx(fieldState.isDirty, !!fieldState.error)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="Address"
                fullWidth
                slotProps={{
                  htmlInput: {
                    maxLength: MAX_STRING,
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
                placeholder="Company"
                fullWidth
                slotProps={{
                  htmlInput: {
                    maxLength: MAX_STRING,
                  },
                }}
                sx={getInputSx(fieldState.isDirty, !!fieldState.error)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => {
                    field.onChange(
                      newValue ? newValue.format('MMMM D, YYYY') : ''
                    );
                  }}
                  format="MMMM D, YYYY"
                  slots={{
                    openPickerIcon: () => (
                      <svg
                        width={18}
                        height={18}
                        fill="none"
                        stroke="var(--accent)"
                      >
                        <use href="/sprite.svg#icon-calendar"></use>
                      </svg>
                    ),
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message,
                      sx: getInputSx(fieldState.isDirty, !!fieldState.error),
                    },
                    popper: {
                      placement: 'bottom',
                      sx: {
                        zIndex: 1400,
                      },
                    },
                    desktopPaper: {
                      sx: {                        
                        borderRadius: '12px',
                        border: `1px solid ${COLORS.borderDefault}`,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        '& .MuiPickersDay-root.Mui-selected': {
                          backgroundColor: COLORS.green,
                          '&:hover': {
                            backgroundColor: COLORS.green,
                          },
                        },
                        '& .MuiPickersDay-today': {
                          borderColor: COLORS.green,
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={field.value === 0 ? '' : field.value}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val === '' ? '' : Number(val));
                }}
                type="number"
                placeholder="Amount"
                fullWidth
                slotProps={{
                  htmlInput: { max: MAX_AMOUNT, maxLength: 8 },
                }}
                sx={getInputSx(fieldState.isDirty, !!fieldState.error)}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="status"
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
                          Status
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
                  Status
                </MenuItem>

                {STATUS.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
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
