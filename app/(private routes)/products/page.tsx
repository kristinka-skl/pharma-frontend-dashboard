import { getProducts } from '@/app/lib/clientApi';
import ProductsPageClient from './productsPage.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { perPage } from '@/app/_utils/utils';
import { Metadata } from 'next';

interface ProductsPageProps {
  searchParams: Promise<{ search: string; page: number }>;
}

export const metadata: Metadata = {
  title: 'Products | E-Pharmacy',
  description:
    'Manage your pharmacy inventory, add new products, update prices, and monitor stock levels.',
  openGraph: {
    title: 'Products | E-Pharmacy',
    description:
      'Keep your pharmacy inventory up to date. Easily manage medication stock, pricing, and categories.',
    url: '', 
    siteName: 'E-Pharmacy',
    images: [
      {
        url: '/images/E_PharmacyOG.webp', 
        width: 1200,
        height: 630,
        alt: 'E-Pharmacy products page showing a table of medications and inventory levels',
      },
    ],
    type: 'website',
  },
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || undefined;
  const page = Number(resolvedSearchParams.page) || 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', search, page],
    queryFn: () => getProducts(page, perPage, search),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPageClient />
    </HydrationBoundary>
  );
}
