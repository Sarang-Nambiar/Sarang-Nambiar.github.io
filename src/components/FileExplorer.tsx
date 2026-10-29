import { useMemo, useState } from 'react';
import type { ItemType, PortfolioItem } from '../types';
import portfolio from '../data/portfolio.json';
import ItemDetail from './ItemDetail';
import { formatRange } from '../dates';
import { ICONS } from '../icons';
import styles from '../styles/screen.module.css';

const items = portfolio.items as PortfolioItem[];

const FOLDERS: { type: ItemType; label: string }[] = [
  { type: 'experience', label: 'Experience' },
  { type: 'project', label: 'Projects' },
  { type: 'award', label: 'Awards' },
];

export default function FileExplorer() {
  const [folder, setFolder] = useState<ItemType | null>(null);
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  // Empty folders (e.g. no awards yet) are hidden; newest entries come first.
  const folders = useMemo(
    () =>
      FOLDERS.map((f) => ({
        ...f,
        list: items
          .filter((it) => it.type === f.type)
          .sort((a, b) => b.start.localeCompare(a.start)),
      })).filter((f) => f.list.length > 0),
    [],
  );
  const open = folders.find((f) => f.type === folder);
  // Filter chips for whichever folder has categorised items (currently Projects).
  const categories = open
    ? [...new Set(open.list.map((it) => it.category).filter((c): c is string => !!c))]
    : [];
  const shown = open?.list.filter((it) => !category || it.category === category) ?? [];

  const crumbs = (
    <div className={styles.crumbs}>
      <button type="button" onClick={() => { setFolder(null); setItem(null); setCategory(null); }}>Coding Portfolio</button>
      {open && <>
        <span>/</span>
        <button type="button" onClick={() => setItem(null)}>{open.label}</button>
      </>}
      {item && <><span>/</span><span>{item.title}</span></>}
    </div>
  );

  return (
    <section className={styles.panel} aria-label="Experience, projects and awards">
      {crumbs}
      {item ? (
        <ItemDetail item={item} />
      ) : open ? (
        <>
          {categories.length > 0 && (
            <div className={styles.chips} role="group" aria-label="Filter by category">
              {[null, ...categories].map((c) => (
                <button
                  key={c ?? 'all'}
                  type="button"
                  aria-pressed={category === c}
                  className={category === c ? styles.chipOn : ''}
                  onClick={() => setCategory(c)}
                >
                  {c ?? 'All'}
                </button>
              ))}
            </div>
          )}
          <ul className={styles.files}>
            {shown.map((it) => (
              <li key={it.id}>
                <button type="button" onClick={() => setItem(it)}>
                  <span aria-hidden="true">{ICONS[it.type]}</span>
                  <span className={styles.fileTitle}>{it.title}</span>
                  <small>{formatRange(it)}</small>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul className={styles.files}>
          {folders.map((f) => (
            <li key={f.type}>
              <button type="button" onClick={() => { setFolder(f.type); setCategory(null); }}>
                <span aria-hidden="true">📁</span>
                <span className={styles.fileTitle}>{f.label}</span>
                <small>{f.list.length} {f.list.length === 1 ? 'item' : 'items'}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
