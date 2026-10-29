import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Mode, Photo, Profile } from '../types';
import Dial from './Dial';
import InfoIcon from './InfoIcon';
import Screen from './Screen';
import styles from '../styles/camera.module.css';

interface Props {
  mode: Mode;
  onToggle: (m: Mode) => void;
  profile: Profile;
  photos: Photo[];
  index: number;
  onStep: (d: number) => void;
}

const BUTTONS: { mode: Exclude<Mode, 'live'>; label: string; text: ReactNode }[] = [
  { mode: 'menu', label: 'Coding portfolio: projects, experience and awards', text: '</>' },
  { mode: 'playback', label: 'Hobby: browse my photos', text: '▶' },
  { mode: 'info', label: 'Info: how to navigate', text: <InfoIcon size={26} /> },
  { mode: 'about', label: 'About me', text: 'ME' },
];

export default function CameraBody({ mode, onToggle, profile, photos, index, onStep }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  // Fallback for browsers (e.g. iPhone Safari) that can't fullscreen an element.
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setExpanded(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded]);

  const toggleFullscreen = () => {
    const el = bodyRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (expanded) {
      setExpanded(false);
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => setExpanded(true));
    } else {
      setExpanded(true);
    }
  };

  return (
    <div ref={bodyRef} className={`${styles.body} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.screenWrap}>
        <div className={styles.screen}>
          <Screen
            mode={mode}
            profile={profile}
            photos={photos}
            index={index}
            onStep={onStep}
            onFullscreen={toggleFullscreen}
          />
        </div>
      </div>
      <nav className={styles.controls} aria-label="Camera controls">
        <div className={styles.buttons}>
          {BUTTONS.map((b) => (
            <button
              key={b.mode}
              type="button"
              className={`${styles.btn} ${mode === b.mode ? styles.active : ''}`}
              aria-label={b.label}
              aria-pressed={mode === b.mode}
              onClick={() => onToggle(b.mode)}
            >
              {b.text}
            </button>
          ))}
          <button
            type="button"
            className={`${styles.btn} ${styles.fs}`}
            aria-label="Toggle fullscreen camera"
            onClick={toggleFullscreen}
          >
            ⛶
          </button>
        </div>
        <Dial onStep={onStep} />
      </nav>
    </div>
  );
}
