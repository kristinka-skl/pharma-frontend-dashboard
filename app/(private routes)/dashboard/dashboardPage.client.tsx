'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './dashboardPage.module.css';
import { getDashboard } from '@/app/lib/clientApi';
import RecentCustomersTable from '@/app/Components/Table/RecentCustomersTable';
import IncomeExpensesTable from '@/app/Components/Table/IncomeExpensesTable';

export default function DashboardPageClient() {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => getDashboard(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  console.log('dashboard:', data);
  return (
    <section className={css.dashboardSection}>
      <h1 className={css.visuallyHidden}>Dashboard</h1>
      {isSuccess && (
        <>
          <div className={css.stats}>
            <ul>
              <li>
                <div className={css.iconAndName}>
                  <svg className={css.statsIcon} width={18} height={18}>
                    <use href="/sprite.svg#icon-billing"></use>
                  </svg>
                  <p>All products</p>
                </div>
                <p>{data.statistics.products}</p>
              </li>
              <li>
                <div className={css.iconAndName}>
                  <svg className={css.statsIcon} width={18} height={18}>
                    <use href="/sprite.svg#icon-billing"></use>
                  </svg>
                  <p>All suppliers</p>
                </div>
                <p>{data.statistics.suppliers}</p>
              </li>
              <li>
                <div className={css.iconAndName}>
                  <svg className={css.statsIcon} width={18} height={18}>
                    <use href="/sprite.svg#icon-users"></use>
                  </svg>
                  <p>All Customers</p>
                </div>
                <p>{data.statistics.customers}</p>
              </li>
            </ul>
          </div>
          <div className={css.tables}>
            <RecentCustomersTable dataList={data.recentCustomers} />
            <IncomeExpensesTable dataList={data?.incomeExpenses} />
          </div>
        </>
      )}
    </section>
  );
}
