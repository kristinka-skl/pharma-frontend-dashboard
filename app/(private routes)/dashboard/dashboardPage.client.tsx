'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './dashboardPage.module.css'
import { getDashboard } from '@/app/lib/clientApi';

export default function DashboardPageClient(){
    const { data, isError, isSuccess } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => getDashboard(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  console.log('dashboard:', data);
return <section className={css.dashboardSection}>
    <h1>Dashboard</h1>
    
</section>
}