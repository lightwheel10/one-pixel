import { useRef, useState } from 'react';

function PixelDispersion() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const size = 14;

  const particlesRef = useRef(null);
  if (!particlesRef.current) {
    const arr = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const isCore = x < size * 0.55;
        if (isCore) {
          arr.push({ x, y, color: '#0A0A0A', drift: 0 });
        } else {
          const px = (x - size * 0.55) / (size * 0.45);
          if (Math.random() < 0.5 - px * 0.3) {
            const r = Math.random();
            const color = r < 0.5 ? '#FF6B47' : r < 0.85 ? '#0A0A0A' : '#C7DDD8';
            arr.push({ x, y, color, drift: 1 + px * 2 + Math.random() * 2 });
          }
        }
      }
    }
    particlesRef.current = arr;
  }
  const particles = particlesRef.current;

  return (
    <span
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '0.85em',
        aspectRatio: '1.5/1',
        position: 'relative',
        cursor: 'crosshair',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox={`0 0 ${size * 1.5} ${size}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }} ref={ref}>
        {particles.map((p, i) => {
          const offset = hovered ? p.drift * 0.6 : 0;
          const tx = p.drift > 0 ? offset * (0.5 + Math.sin(i) * 0.4) : 0;
          const ty = p.drift > 0 ? offset * (Math.cos(i * 0.5) * 0.6) : 0;
          const driftClass = p.drift > 0
            ? (i % 3 === 0 ? 'pix-drift-a' : i % 3 === 1 ? 'pix-drift-b' : 'pix-drift-c')
            : '';
          return (
            <rect
              key={i}
              x={p.x}
              y={p.y}
              width="0.95"
              height="0.95"
              fill={p.color}
              className={driftClass}
              style={{
                transition: `transform ${0.5 + (i % 7) * 0.05}s cubic-bezier(.2,.7,.3,1)`,
                transform: `translate(${tx}px, ${ty}px)`,
                transformOrigin: `${p.x}px ${p.y}px`,
                animationDelay: `${(i % 11) * 0.18}s`,
              }}
            />
          );
        })}
      </svg>
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden></div>
      <div className="shell" style={{ position: 'relative', zIndex: 2 }}>
        <h1 className="hero-title">
          <span className="line">We design</span>
          <span className="line">
            <em>premium</em> websites
          </span>
          <span className="line" style={{ display: 'flex', alignItems: 'baseline', gap: '0.2em', flexWrap: 'wrap' }}>
            <PixelDispersion />
            <span>by <span className="accent">pixel.</span></span>
          </span>
        </h1>

        <div className="hero-foot">
          <p style={{ maxWidth: '46ch', fontSize: 18 }}>
            OnePixel is a small, opinionated studio building modern, polished websites for brands that refuse to look like everyone else.
          </p>
          <div className="hero-cta-wrap">
            <a href="#contact" className="btn btn-primary">
              <span className="pix"></span> Book intro call
            </a>
            <a href="#work" className="btn btn-ghost">Selected work</a>
          </div>
        </div>
      </div>
    </section>
  );
}
