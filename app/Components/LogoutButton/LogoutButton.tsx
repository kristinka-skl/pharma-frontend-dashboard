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
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </button>
  );
}
