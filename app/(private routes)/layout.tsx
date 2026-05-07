import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/Sidebar';

import css from './privateLayout.module.css';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.appWrapper}>
      <Header />
      <div className={css.mainContainer}>
        <Sidebar />
        <div className={css.contentWrapper}>
          <main className={css.mainContent}>{children}</main>
        </div>
      </div>
    </div>
  );
}
