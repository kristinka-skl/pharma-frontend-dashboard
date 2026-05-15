import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import DashboardPageClient from './dashboardPage.client';
import { getDashboard } from '@/app/lib/clientApi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Pharmacy Dashboard',
  description:
    'Comprehensive dashboard application for managing pharmacy operations, suppliers, customers, and orders.',
  openGraph: {
    title: 'E-Pharmacy Dashboard',
    description:
      'Streamline your pharmacy management. Track income, expenses, recent customers, and manage orders efficiently.',
    url: '', 
    siteName: 'E-Pharmacy',
    images: [
      {
        url: '/images/E_PharmacyOG.webp', 
        width: 1200,
        height: 630,
        alt: 'E-Pharmacy dashboard overview showing financial metrics and recent orders',
      },
    ],
    type: 'website',
  },
};

export default async function DashboardPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['dashboard'],
    queryFn: () => getDashboard(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPageClient />
    </HydrationBoundary>
  );
}
