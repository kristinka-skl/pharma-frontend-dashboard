import { getSuppliers } from "@/app/lib/clientApi";
import SuppliersPageClient from "./suppliersPage.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { perPage } from "@/app/_utils/utils";
import { Metadata } from "next";

interface SuppliersPageProps {
  searchParams: Promise<{ search: string; page: number }>;
}

export const metadata: Metadata = {
  title: 'Suppliers | E-Pharmacy',
  description:
    'Manage pharmacy suppliers, track contact information, and monitor supply chain details.',
  openGraph: {
    title: 'Suppliers | E-Pharmacy',
    description:
      'Maintain strong relationships with your partners. Track supplier details, active contracts, and supply history.',
    url: '', 
    siteName: 'E-Pharmacy',
    images: [
      {
        url: '/images/E_PharmacyOG.webp', 
        width: 1200,
        height: 630,
        alt: 'E-Pharmacy suppliers page showing a list of active suppliers and contact details',
      },
    ],
    type: 'website',
  },
};

export default async function SuppliersPage({ searchParams }: SuppliersPageProps) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || undefined;
  const page = Number(resolvedSearchParams.page) || 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['suppliers', search, page],
    queryFn: () => getSuppliers(page, perPage, search),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuppliersPageClient />
    </HydrationBoundary>
  );
}