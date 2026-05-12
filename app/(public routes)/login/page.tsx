import LoginForm from '@/app/Components/LoginForm/LoginForm';
import css from './loginPage.module.css';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';

export default function Login() {
  return (
    <section className={css.loginSection}>
      <div className={css.loginIconWrapper}>
        <Image
          className={css.logoIcon}
          src="/images/logo.png"
          width={44}
          height={44}
          alt="logo pharmacy"
        ></Image>
        <p className={css.logoText}>E-Pharmacy</p>
      </div>
      <div className={css.contentWrapper}>
      <div className={css.heroTextWrapper}>
        <Image className={css.heroImage} src='/images/white-round-pill.png' width={95} height={93} alt='white pill'/>
        <p className={css.heroText}>
          Your medication, delivered Say goodbye to all{' '}
          <span className={css.heroTextAccent}>your healthcare</span> worries
          with us
        </p>
      </div>
      <LoginForm />
      </div>
      <Toaster/>
    </section>
  );
}
