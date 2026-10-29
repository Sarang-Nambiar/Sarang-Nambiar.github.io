import { useCallback, useEffect, useState } from 'react';
import CameraBody from './components/CameraBody';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import type { Mode, Photo } from './types';
import photosData from './data/photos.json';
import portfolio from './data/portfolio.json';
import styles from './styles/app.module.css';

const photos = photosData as Photo[];
type Theme = 'dark' | 'light';

const initialTheme = (): Theme => {
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

export default function App() {
  const [mode, setMode] = useState<Mode>('live');
  const [index, setIndex] = useState(0);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Pressing a mode's button again returns to live view, like a camera.
  const toggle = (m: Mode) => setMode((cur) => (cur === m ? 'live' : m));
  const step = useCallback(
    (d: number) => setIndex((i) => (i + d + photos.length) % photos.length),
    [],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable; theme just won't persist */
    }
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.fullscreenElement) setMode('live');
      if (mode === 'playback') {
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, step]);

  const { profile } = portfolio;
  return (
    <div className={styles.app}>
      <Navbar
        name={profile.name}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />
      <main className={styles.stage}>
        <CameraBody
          mode={mode}
          onToggle={toggle}
          profile={profile}
          photos={photos}
          index={index}
          onStep={step}
        />
      </main>
      <Footer links={profile.links} />
    </div>
  );
}
