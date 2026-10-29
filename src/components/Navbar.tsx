import styles from '../styles/navbar.module.css';

interface Props {
  name: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

function FlashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  );
}

export default function Navbar({ name, theme, onToggleTheme }: Props) {
  const light = theme === 'light';
  return (
    <header className={styles.nav}>
      <div className={styles.brand}>
        <strong>{name}</strong>
      </div>
      <button
        type="button"
        className={`${styles.flash} ${light ? styles.on : ''}`}
        aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
        aria-pressed={light}
        onClick={onToggleTheme}
      >
        <FlashIcon />
      </button>
    </header>
  );
}
