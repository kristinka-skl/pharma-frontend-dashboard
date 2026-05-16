'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import css from './LogoutButton.module.css';
import toast from 'react-hot-toast';
import { logout } from '@/app/lib/clientApi';
import { useUIStore } from '@/app/store/uiStore';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';

export default function LogoutButton() {
  const router = useRouter();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const { closeSidebar } = useUIStore();
const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      clearIsAuthenticated();
      toast.success('Logged out successfully');
      closeSidebar();
      router.push('/login');
    } catch (error) {
      toast.error('Error logging out');
      setIsLoggingOut(false);
    }
  };

  return (
    <button 
      className={css.logoutBtn}
      onClick={handleLogout}
      aria-label="Log out"
      title="Log out"
      disabled={isLoggingOut}
      style={{ opacity: isLoggingOut ? 0.7 : 1, cursor: isLoggingOut ? 'not-allowed' : 'pointer' }}
    >
        {isLoggingOut ? (
          <Loader mini />
        ) : (
          <svg className={css.logoutBtnIcon} width="13" height="13" aria-hidden='true'>
              <use href='/sprite.svg#icon-logout'></use>
          </svg>
        )}
    </button>
  );
}
