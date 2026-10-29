import { useEffect } from 'react';
import type { Photo } from '../types';
import { assetUrl } from '../assetUrl';
import { useSwipe } from '../useSwipe';
import styles from '../styles/screen.module.css';

const ROTATE_MS = 8000;

interface Props {
  photos: Photo[];
  index: number;
  onStep: (d: number) => void;
  onFullscreen: () => void;
}

export default function Playback({ photos, index, onStep, onFullscreen }: Props) {
  const swipe = useSwipe(onStep);

  // Slideshow: advance slowly unless the visitor prefers reduced motion.
  // Depending on `index` restarts the timer after a manual change.
  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => onStep(1), ROTATE_MS);
    return () => clearTimeout(t);
  }, [index, photos.length, onStep]);

  return (
    <div className={styles.playback}>
      <div
        className={styles.stack}
        {...swipe.handlers}
        onClick={() => !swipe.wasDrag() && onFullscreen()}
      >
        {photos.map((p, i) => (
          <img
            key={p.id}
            className={`${styles.slide} ${i === index ? styles.shown : ''}`}
            src={assetUrl(p.large)}
            srcSet={`${assetUrl(p.small)} 1280w, ${assetUrl(p.large)} 2560w`}
            sizes="(max-width: 900px) 100vw, 900px"
            alt={i === index ? p.title : ''}
            loading={i === 0 ? 'eager' : 'lazy'}
            draggable={false}
          />
        ))}
      </div>
      <button type="button" className={`${styles.nav} ${styles.prev}`} aria-label="Previous photo" onClick={() => onStep(-1)}>‹</button>
      <button type="button" className={`${styles.nav} ${styles.next}`} aria-label="Next photo" onClick={() => onStep(1)}>›</button>
      <span className={styles.counter}>{photos[index].title} · {index + 1}/{photos.length}</span>
    </div>
  );
}
