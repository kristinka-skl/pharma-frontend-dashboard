'use client';

import Link from 'next/link';
import { useUIStore } from '@/app/store/uiStore';
import css from './Sidebar.module.css';
import LogoutButton from '../LogoutButton/LogoutButton';

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useUIStore();

  return (
    <>
      {isSidebarOpen && <div className={css.backdrop} onClick={closeSidebar} />}
      <aside className={`${css.sidebar} ${isSidebarOpen ? css.open : ''}`}>
        <button className={css.closeBtn} onClick={closeSidebar}>
          ✕
        </button>

        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/dashboard`}
              className={css.menuLink}
              onClick={closeSidebar}
            >
              D
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/orders`}
              className={css.menuLink}
              onClick={closeSidebar}
            >
              O
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link href={`/products`} className={css.menuLink}>
              P
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link href={`/suppliers`} className={css.menuLink}>
              S
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link href={`/customers`} className={css.menuLink}>
              C
            </Link>
          </li>
        </ul>
        <div className={css.mobileLogout}>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
