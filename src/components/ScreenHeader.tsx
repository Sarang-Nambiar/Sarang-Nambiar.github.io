import styles from '../styles/screen.module.css';

export default function ScreenHeader({ icon, label }: { icon: string; label: string }) {
  return (
    <div className={styles.header}>
      <span aria-hidden="true">{icon}</span>
      {label}
    </div>
  );
}
