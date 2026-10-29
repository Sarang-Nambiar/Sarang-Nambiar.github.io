import type { Profile } from '../types';
import styles from '../styles/screen.module.css';

export function InfoPanel() {
  return (
    <section className={styles.panel} aria-label="How to navigate">
      <h2>How to use this camera</h2>
      <ul>
        <li><b>&lt;/&gt;</b> opens my Coding Portfolio: folders of projects, experience and awards.</li>
        <li><b>▶</b> opens Hobby, my photography. Change photos by dragging the photo, turning the dial (drag or mouse wheel), or using the ← → keys.</li>
        <li><b>ME</b> tells you about me.</li>
        <li><b>⛶</b> makes the whole camera fill your display.</li>
        <li><b>⚡</b> in the top bar switches light and dark mode.</li>
        <li>Press a button again, or <kbd>Esc</kbd>, to return to live view.</li>
      </ul>
    </section>
  );
}

export function AboutPanel({ profile }: { profile: Profile }) {
  return (
    <section className={styles.panel} aria-label="About me">
      <h2>{profile.name}</h2>
      <p className={styles.sub}>{profile.tagline}</p>
      {profile.bio.split('\n\n').map((para) => (
        <p key={para}>{para}</p>
      ))}
      <p className={styles.links}>
        <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.links.flickr} target="_blank" rel="noreferrer">Flickr</a>
      </p>
    </section>
  );
}
