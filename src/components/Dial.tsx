import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import styles from '../styles/dial.module.css';

const STEP_DEG = 30;

// Rear control dial: turn it by dragging around it or with the mouse wheel.
export default function Dial({ onStep }: { onStep: (d: number) => void }) {
  const ring = useRef<HTMLDivElement>(null);
  const last = useRef<number | null>(null);
  const acc = useRef(0);
  const [angle, setAngle] = useState(0);

  const rotate = useCallback(
    (deg: number) => {
      setAngle((a) => a + deg);
      acc.current += deg;
      while (acc.current >= STEP_DEG) { onStep(1); acc.current -= STEP_DEG; }
      while (acc.current <= -STEP_DEG) { onStep(-1); acc.current += STEP_DEG; }
    },
    [onStep],
  );

  // Native listener: React's onWheel is passive and can't stop the page scrolling.
  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      rotate(e.deltaY * (e.deltaMode === 1 ? 10 : 0.3));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [rotate]);

  const pointerAngle = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    last.current = pointerAngle(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (last.current === null) return;
    const a = pointerAngle(e);
    let d = a - last.current;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    last.current = a;
    rotate(d);
  };
  const onUp = () => { last.current = null; };

  return (
    <div className={styles.dial}>
      <div
        ref={ring}
        className={styles.ring}
        aria-hidden="true"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className={styles.ticks} style={{ transform: `rotate(${angle}deg)` }} />
        <div className={styles.cap} />
      </div>
    </div>
  );
}
