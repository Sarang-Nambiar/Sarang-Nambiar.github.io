import type { Profile } from '../types';
import styles from '../styles/app.module.css';

export default function Footer({ links }: { links: Profile['links'] }) {
  return (
    <footer className={styles.footer}>
      More projects and photos available on{' '}
      <a href={links.github} target="_blank" rel="noreferrer">GitHub</a> and{' '}
      <a href={links.flickr} target="_blank" rel="noreferrer">Flickr</a>.
    </footer>
  );
}
