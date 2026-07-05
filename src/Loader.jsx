import { useEffect, useRef, useState } from 'react';

export function Loader({ duration = 9000, mark = 'OnePixel' }) {
  // All timings are tuned to a 9s intro; `scale` re-paces the whole
  // choreography for shorter uses (e.g. a ~2.5s page-transition loader).
  // duration === 9000 → scale 1 → identical to the original intro.
  const scale = duration / 9000;

  const [gone, setGone] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [flickering, setFlickering] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const flick = setTimeout(() => setFlickering(true), 4800 * scale);
    const dismiss = setTimeout(() => {
      setGone(true);
      // Paras · 2026-07-05: fire the moment the loader STARTS fading out (not at unmount), so a page
      // can reveal its hero UNDER the departing loader and let the loader's own fade be the visible
      // cross-fade. Additive: 'onepixel:loader-complete' still fires at unmount below (scroll is only
      // restored then), so existing listeners on the main site are unchanged.
      document.dispatchEvent(new CustomEvent('onepixel:loader-leaving'));
    }, 7500 * scale);
    const unmount = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = prevOverflow;
      document.dispatchEvent(new CustomEvent('onepixel:loader-complete'));
    }, 9000 * scale);

    return () => {
      clearTimeout(flick);
      clearTimeout(dismiss);
      clearTimeout(unmount);
      document.body.style.overflow = prevOverflow;
    };
  }, [scale]);

  // Pre-compute pixel grid: black core (column-wave fade-in + random pops) + dispersion
  const pixelsRef = useRef(null);
  if (!pixelsRef.current) {
    const fullSize = 14;
    const coreEnd = Math.ceil(fullSize * 0.55); // 8
    const arr = [];

    // Core: each pixel fades in column-by-column with subtle row offset (wave),
    // then twinkles to a random brand color repeatedly to indicate active loading.
    for (let y = 0; y < fullSize; y++) {
      for (let x = 0; x < coreEnd; x++) {
        const fadeinDelay = Math.round(
          (x * 220 + Math.sin((y / fullSize) * Math.PI * 2) * 80 + 100) * scale
        );
        arr.push({
          x, y,
          color: 'currentColor',
          kind: 'march',
          fadeinDelay,
          popColor: Math.random() < 0.6 ? '#FF6B47' : '#C7DDD8',
          popDelay: (2.0 + Math.random() * 3.5) * scale,    // 2.0–5.5s — first pops appear once core is mostly in
          popDuration: (4.5 + Math.random() * 3.5) * scale, // 4.5–8s loop per pixel
        });
      }
    }

    // Scattered dispersion in the right 6 columns — fades in after core is up
    for (let y = 0; y < fullSize; y++) {
      for (let x = coreEnd; x < fullSize; x++) {
        const px = (x - fullSize * 0.55) / (fullSize * 0.45);
        if (Math.random() < 0.5 - px * 0.3) {
          const r = Math.random();
          let color, kind;
          if (r < 0.5)        { color = '#FF6B47';      kind = 'color'; }
          else if (r < 0.85)  { color = 'currentColor'; kind = 'static'; }
          else                { color = '#C7DDD8';      kind = 'color'; }
          const delay = Math.round((2800 + (x - coreEnd) * 110 + y * 14) * scale);
          arr.push({ x, y, color, kind, delay });
        }
      }
    }
    pixelsRef.current = arr;
  }
  const pixels = pixelsRef.current;

  if (!mounted) return null;

  return (
    <div
      className={`loader ${flickering ? 'flickering' : ''} ${gone ? 'gone' : ''}`}
      style={{ transitionDuration: `${1100 * scale}ms` }}
      aria-hidden
    >
      <div className="loader-stage">
        <svg viewBox="0 0 14 14" preserveAspectRatio="xMidYMid meet" className="loader-cluster">
          {pixels.map((p, i) => (
            <rect
              key={i}
              x={p.x}
              y={p.y}
              width="0.95"
              height="0.95"
              fill={p.color}
              className={`loader-pixel loader-pixel-${p.kind}`}
              style={
                p.kind === 'march'
                  ? {
                      '--fadein-delay': `${p.fadeinDelay}ms`,
                      '--pop-color': p.popColor,
                      '--pop-delay': `${p.popDelay}s`,
                      '--pop-duration': `${p.popDuration}s`,
                    }
                  : { animationDelay: `${p.delay}ms` }
              }
            />
          ))}
        </svg>
        <div
          className="loader-mark"
          style={{ animationDelay: `${4000 * scale}ms`, animationDuration: `${800 * scale}ms` }}
        >{mark}</div>
      </div>
    </div>
  );
}
