import type { PortfolioItem } from '../types';
import { assetUrl } from '../assetUrl';
import { formatRange } from '../dates';
import { ICONS } from '../icons';
import styles from '../styles/screen.module.css';

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function ItemDetail({ item }: { item: PortfolioItem }) {
  return (
    <article className={styles.detail}>
      <h2>{item.title}</h2>
      <p className={styles.sub}>
        {item.org && <>{item.org} · </>}{formatRange(item)}
      </p>
      <div className={styles.media}>
        {item.images?.length ? (
          item.images.map((src) => <img key={src} src={assetUrl(src)} alt={`${item.title} screenshot`} loading="lazy" />)
        ) : (
          <span className={styles.defaultIcon} aria-hidden="true">{ICONS[item.type]}</span>
        )}
      </div>
      {item.description && <p>{item.description}</p>}
      {item.highlights && item.highlights.length > 0 && (
        <ul className={styles.highlights}>
          {item.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
      )}
      {item.tags && item.tags.length > 0 && (
        <p className={styles.tags}>{item.tags.map((t) => <span key={t}>{t}</span>)}</p>
      )}
      <p className={styles.links}>
        {item.github && (
          <a href={item.github} target="_blank" rel="noreferrer" aria-label={`${item.title} on GitHub`}>
            <GitHubIcon />
          </a>
        )}
        {item.links?.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
        ))}
      </p>
    </article>
  );
}
