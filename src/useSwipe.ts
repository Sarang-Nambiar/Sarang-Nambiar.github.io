import { useRef } from 'react';
import type { PointerEvent } from 'react';

const THRESHOLD = 50;

// Horizontal drag/swipe: dragging left shows the next photo, right the previous.
export function useSwipe(onStep: (d: number) => void) {
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);

  return {
    handlers: {
      onPointerDown: (e: PointerEvent<HTMLElement>) => {
        startX.current = e.clientX;
        dragged.current = false;
        e.currentTarget.setPointerCapture(e.pointerId);
      },
      onPointerUp: (e: PointerEvent<HTMLElement>) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > THRESHOLD) {
          dragged.current = true;
          onStep(dx < 0 ? 1 : -1);
        }
      },
      onPointerCancel: () => {
        startX.current = null;
      },
    },
    // True right after a drag, so a click that follows it can be ignored.
    wasDrag: () => dragged.current,
  };
}
