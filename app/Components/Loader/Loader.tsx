import styles from './Loader.module.css';

interface LoaderProps {
  mini?: boolean;
}

export const Loader = ({ mini = false }: LoaderProps) => {
    if (mini) {
    return <div className={styles.loaderMini}></div>;
  }
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};