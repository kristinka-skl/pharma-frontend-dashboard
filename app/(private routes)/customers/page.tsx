import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CustomersPageClient from './customersPage.client';
import { getCustomers } from '@/app/lib/clientApi';
import { perPage } from '@/app/_utils/utils';
import { Metadata } from 'next';

interface CustomersPageProps {
  searchParams: Promise<{ search: string; page: number }>;
}

export const metadata: Metadata = {
  title: 'Customers | E-Pharmacy',
  description:
    'Manage customer details for your pharmacy.',
  openGraph: {
    title: 'Customers | E-Pharmacy',
    description:
      'Keep track of your pharmacy clients. View customer profiles and contact information.',
    url: 'https://pharma-frontend-dashboard.vercel.app/customers', 
    siteName: 'E-Pharmacy',
    images: [
      {
        url: '/images/E_PharmacyOG.webp', 
        width: 1200,
        height: 630,
        alt: 'E-Pharmacy customers page showing a table of registered customers and their info',
      },
    ],
    type: 'website',
  },
};

export default async function CustomersPage({ searchParams }: CustomersPageProps) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || undefined;
  const page = Number(resolvedSearchParams.page) || 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['customers', search, page],
    queryFn: () => getCustomers(page, perPage, search),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomersPageClient />
    </HydrationBoundary>
  );
}
