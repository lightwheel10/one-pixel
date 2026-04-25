import { useEffect, useRef, useState } from 'react';

export function Loader() {
  const [gone, setGone] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [flickering, setFlickering] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const flick = setTimeout(() => setFlickering(true), 4800);
    const dismiss = setTimeout(() => setGone(true), 7500);
    const unmount = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = prevOverflow;
    }, 9000);

    return () => {
      clearTimeout(flick);
      clearTimeout(dismiss);
      clearTimeout(unmount);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

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
          x * 220 + Math.sin((y / fullSize) * Math.PI * 2) * 80 + 100
        );
        arr.push({
          x, y,
          color: 'currentColor',
          kind: 'march',
          fadeinDelay,
          popColor: Math.random() < 0.6 ? '#FF6B47' : '#C7DDD8',
          popDelay: 2.0 + Math.random() * 3.5,    // 2.0–5.5s — first pops appear once core is mostly in
          popDuration: 4.5 + Math.random() * 3.5, // 4.5–8s loop per pixel
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
          const delay = 2800 + Math.round((x - coreEnd) * 110 + y * 14);
          arr.push({ x, y, color, kind, delay });
        }
      }
    }
    pixelsRef.current = arr;
  }
  const pixels = pixelsRef.current;

  if (!mounted) return null;

  return (
    <div className={`loader ${flickering ? 'flickering' : ''} ${gone ? 'gone' : ''}`} aria-hidden>
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
        <div className="loader-mark">OnePixel · Mumbai</div>
      </div>
    </div>
  );
}
