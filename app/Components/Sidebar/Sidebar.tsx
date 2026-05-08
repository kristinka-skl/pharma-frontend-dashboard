'use client';

import Link from 'next/link';
import { useUIStore } from '@/app/store/uiStore';
import css from './Sidebar.module.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useUIStore();
  const pathname = usePathname();
  return (
    <>
      {isSidebarOpen && <div className={css.backdrop} onClick={closeSidebar} />}
      <aside className={`${css.sidebar} ${isSidebarOpen ? css.open : ''}`}>
        <button className={css.closeBtn} onClick={closeSidebar}>
          <svg className={css.closeBtnIcon} width="32" height="32">
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>

        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/dashboard`}
              className={css.menuLink}
              onClick={closeSidebar}
            >
              <svg
                className={`${css.menuItemIcon} ${pathname === '/dashboard' ? css.active : ''}`}
                width="16"
                height="16"
              >
                <use href="/sprite.svg#icon-dashboard"></use>
              </svg>
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/orders`}
              className={css.menuLink}
              onClick={closeSidebar}
            >
              <svg
                className={`${css.menuItemIcon} ${pathname === '/orders' ? css.active : ''}`}
                width="16"
                height="16"
              >
                <use href="/sprite.svg#icon-shopping-cart"></use>
              </svg>
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/products`}
              className={css.menuLink}
              onClick={closeSidebar}
            >
              <svg
                className={`${css.menuItemIcon} ${pathname === '/products' ? css.active : ''}`}
                width="16"
                height="16"
              >
                <use href="/sprite.svg#icon-flask"></use>
              </svg>
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/suppliers`}
              className={css.menuLink}
              onClick={closeSidebar}
            >
              <svg
                className={`${css.menuItemIcon} ${pathname === '/suppliers' ? css.active : ''}`}
                width="16"
                height="16"
              >
                <use href="/sprite.svg#icon-pharmacy"></use>
              </svg>
            </Link>
          </li>
          <li className={css.menuItem}>
            <Link
              href={`/customers`}
              className={css.menuLink}
              onClick={closeSidebar}
            >
              <svg
                className={`${css.menuItemIcon} ${pathname === '/customers' ? css.active : ''}`}
                width="16"
                height="16"
              >
                <use href="/sprite.svg#icon-users-menu"></use>
              </svg>
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
