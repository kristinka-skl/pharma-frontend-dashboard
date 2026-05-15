import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import OrdersPageClient from "./ordersPage.client";
import { getOrders } from "@/app/lib/clientApi";
import { perPage } from "@/app/_utils/utils";
import { Metadata } from "next";

interface OrdersPageProps {
  params: Promise<{ search: string; page: number }>;
}

export const metadata: Metadata = {
  title: 'Orders | E-Pharmacy',
  description:
    'View and manage all customer orders, track delivery statuses, and monitor transaction details.',
  openGraph: {
    title: 'Orders | E-Pharmacy',
    description:
      'Track and manage your pharmacy orders efficiently. View order history, customer info, and current statuses.',
    url: '', 
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

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { search, page } = await params;
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