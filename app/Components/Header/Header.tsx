'use client';

import { useUIStore } from '@/app/store/uiStore';

import css from './Header.module.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import Image from 'next/image';
import { useAuthStore } from '@/app/store/authStore';
import { usePathname } from 'next/navigation';
import { appPages } from '@/app/_utils/utils';
import Link from 'next/link';

export default function Header() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const { user } = useAuthStore();
  const pathname = usePathname();
  const curPageName = appPages.get(pathname);

  return (
    <header className={css.header}>
      <button className={css.burgerMenu} onClick={toggleSidebar}>
        <svg className={css.burgerMenuIcon} width="32" height="32">
          <use href="/sprite.svg#icon-menu-burger"></use>
        </svg>
      </button>
      <Link href='/dashboard'>
      <Image
        className={css.logoIcon}
        src="/images/logo-header.png"
        width={32}
        height={32}
        alt="logo pharmacy"
      ></Image></Link>

<div className={css.headerDesktopLayout}>
      <div className={css.titleAndInfoWrapper}>
        <p className={css.headerTitle}>Medicine store</p>
        <div className={css.curPageAndEmailWrapper}>
          <p>{curPageName}</p>
          <span>|</span>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className={css.desktopLogout}>
        <LogoutButton />
      </div>
</div>
    </header>
  );
}
