'use client';

import { useUIStore } from '@/app/store/uiStore';

import css from './Header.module.css';
import LogoutButton from '../LogoutButton/LogoutButton';

export default function Header() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className={css.header}>
      <button className={css.burgerMenu} onClick={toggleSidebar}>
        ☰
      </button>

      <div className={css.logo}>Medicine store</div>
      <div className={css.desktopLogout}>
        <LogoutButton />
      </div>
    </header>
  );
}