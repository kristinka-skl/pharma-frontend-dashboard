'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import css from './LogoutButton.module.css';
import toast from 'react-hot-toast';
import { logout } from '@/app/lib/clientApi';
import { useUIStore } from '@/app/store/uiStore';

export default function LogoutButton() {
  const router = useRouter();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const { closeSidebar } = useUIStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      toast.success('Logged out successfully');
      closeSidebar();
      router.push('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <button 
      className={css.logoutBtn}
      onClick={handleLogout}
      aria-label="Log out"
      title="Log out"
    >
        <svg className={css.logoutBtnIcon} width="13"
        height="13" aria-hidden='true'>
            <use href='/sprite.svg#icon-logout'></use>
        </svg>
    </button>
  );
}
