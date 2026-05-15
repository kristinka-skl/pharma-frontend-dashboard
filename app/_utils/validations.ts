import * as yup from 'yup';

export const STATUS = ['Active', 'Deactive'];
export const MAX_AMOUNT = 1000000;
export const MAX_STRING = 300;

export const supplierSchema = yup.object({
  name: yup
    .string()
    .trim()
    .max(MAX_STRING, 'Max 300 characters')
    .required('Required'),
  status: yup.string().required('Required').oneOf(STATUS, 'Required'),
  amount: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'Min 0')
    .max(MAX_AMOUNT, `Max amount is ${MAX_AMOUNT}`)
    .required('Required'),
  suppliers: yup
    .string()
    .trim()
    .max(MAX_STRING, 'Max 300 characters')
    .required('Required'),
  address: yup
    .string()
    .trim()
    .max(MAX_STRING, 'Max 300 characters')
    .required('Required'),
  date: yup.string().required('Required'),
});

export const CATEGORIES = [
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
export const MAX_PRICE = 10000000;
export const MAX_STOCK = 1000000;


export const productSchema = yup.object({
  name: yup.string().max(MAX_STRING, 'Max 300 characters').trim().required('Required'),
  category: yup.string().required('Required').oneOf(CATEGORIES, 'Required'),
  stock: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'Min 0')
    .max(MAX_STOCK, `Max stock is ${MAX_STOCK}`)
    .required('Required'),
  suppliers: yup
    .string()
    .trim()
    .max(MAX_STRING, 'Max 300 characters')
    .required('Required'),
  price: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be > 0')
    .max(MAX_PRICE, `Max price is ${MAX_PRICE}`)
    .required('Required'),
});
