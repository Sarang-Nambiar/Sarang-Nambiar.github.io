import type { Mode, Photo, Profile } from '../types';
import FileExplorer from './FileExplorer';
import InfoIcon from './InfoIcon';
import Playback from './Playback';
import ScreenHeader from './ScreenHeader';
import { AboutPanel, InfoPanel } from './Panels';
import styles from '../styles/screen.module.css';

interface Props {
  mode: Mode;
  profile: Profile;
  photos: Photo[];
  index: number;
  onStep: (d: number) => void;
  onFullscreen: () => void;
}

export default function Screen({ mode, profile, photos, index, onStep, onFullscreen }: Props) {
  if (mode === 'playback') {
    return (
      <>
        <Playback photos={photos} index={index} onStep={onStep} onFullscreen={onFullscreen} />
        <ScreenHeader icon="▶" label="Hobby" />
      </>
    );
  }

  return (
    <div className={styles.live}>
      {mode === 'live' && (
        <p className={styles.start}>
          Click on <InfoIcon size={18} /> to learn more
        </p>
      )}
      {mode === 'menu' && (
        <>
          <ScreenHeader icon="</>" label="Coding" />
          <FileExplorer />
        </>
      )}
      {mode === 'info' && (
        <>
          <ScreenHeader icon="ⓘ" label="Info" />
          <InfoPanel />
        </>
      )}
      {mode === 'about' && (
        <>
          <ScreenHeader icon="☺" label="About me" />
          <AboutPanel profile={profile} />
        </>
      )}
    </div>
  );
}
