import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import OrdersPageClient from "./ordersPage.client";
import { getOrders } from "@/app/lib/clientApi";
import { perPage } from "@/app/_utils/utils";
import { Metadata } from "next";

interface OrdersPageProps {
  searchParams: Promise<{ search: string; page: number }>;
}

export const metadata: Metadata = {
  title: 'Orders | E-Pharmacy',
  description:
    'View and manage all customer orders, track delivery statuses, and monitor transaction details.',
  openGraph: {
    title: 'Orders | E-Pharmacy',
    description:
      'Track and manage your pharmacy orders efficiently. View order history, customer info, and current statuses.',
    url: 'https://pharma-frontend-dashboard.vercel.app/orders', 
    siteName: 'E-Pharmacy',
    images: [
      {
        url: '/images/E_PharmacyOG.webp', 
        width: 1200,
        height: 630,
        alt: 'E-Pharmacy orders page displaying a table of recent transactions and statuses',
      },
    ],
    type: 'website',
  },
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || undefined;
  const page = Number(resolvedSearchParams.page) || 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['orders', search, page],
    queryFn: () => getOrders(page, perPage, search),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrdersPageClient />
    </HydrationBoundary>
  );
}