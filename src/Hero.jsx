import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PixelDispersion() {
  const scopeRef = useRef(null);
  const size = 14;
  // Paras · 2026-06-18: phones use a tighter 12-unit viewBox while keeping the 14×14 pixel
  // generation — this crops the sparse right columns + bottom rows and scales the block up,
  // which reads better next to “by pixel.”. Desktop keeps the full 14 viewBox. (viewBox is an
  // SVG attribute, not CSS, so this size-switch has to live here rather than in a media query.)
  const [vbSize, setVbSize] = useState(() => (typeof window !== 'undefined' && window.innerWidth <= 600) ? 12 : 14);
  useEffect(() => {
    const onResize = () => setVbSize(window.innerWidth <= 600 ? 12 : 14);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const particlesRef = useRef(null);
  if (!particlesRef.current) {
    const arr = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const isCore = x < size * 0.55;
        if (isCore) {
          // Paras: 'currentColor' (ink) instead of hard-coded black so the block stays
          // visible in dark mode too — it inherits var(--ink) from .hero-pixblock.
          arr.push({ x, y, color: 'currentColor', drift: 0 });
        } else {
          const px = (x - size * 0.55) / (size * 0.45);
          if (Math.random() < 0.5 - px * 0.3) {
            const r = Math.random();
            const color = r < 0.5 ? '#FF6B47' : r < 0.85 ? 'currentColor' : '#C7DDD8';
            const drift = 1 + px * 2 + Math.random() * 2;
            // Paras · 2026-06-18: precompute each loose pixel's scatter target (SVG units).
            // varied directions via sin/cos of its index so they fly apart, not in a line.
            // mag = drift * 4 → a big scatter; on desktop the svg overflow is visible so they
            // fly well beyond the block (mobile keeps the clip to preserve the viewBox-12 crop).
            const seed = arr.length;
            const mag = drift * 4;
            arr.push({ x, y, color, drift, dx: mag * Math.sin(seed * 1.3), dy: mag * Math.cos(seed * 0.9) });
          }
        }
      }
    }
    particlesRef.current = arr;
  }
  const particles = particlesRef.current;

  // Paras · 2026-06-18: scatter the loose pixels as you scroll through the hero (GSAP
  // ScrollTrigger, scrubbed). Each .hero-pix-scatter rect tweens to its data-dx/dy as the
  // hero scrolls past. Core pixels stay put. Honours prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const heroEl = scopeRef.current?.closest('.hero');
    if (!heroEl) return;
    const ctx = gsap.context(() => {
      // Tie scatter to the hero's scroll: 'top top' guarantees 0 scatter at load on every
      // screen (the centred mobile hero would otherwise start mid-band, pre-scattered).
      // 'center top' completes the scatter by the time you've scrolled half the hero — so the
      // dispersion plays out while the block is still on screen, then it exits already scattered.
      gsap.to('.hero-pix-scatter', {
        x: (i, t) => parseFloat(t.dataset.dx),
        y: (i, t) => parseFloat(t.dataset.dy),
        ease: 'none',
        scrollTrigger: { trigger: heroEl, start: 'top top', end: 'center top', scrub: 0.6 },
      });
    }, scopeRef);
    return () => ctx.revert();
  }, []);

  return (
    <span className="hero-pixblock" ref={scopeRef}>
      <svg viewBox={`0 0 ${vbSize} ${vbSize}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
        {particles.map((p, i) => {
          const driftClass = p.drift > 0
            ? (i % 3 === 0 ? 'pix-drift-a' : i % 3 === 1 ? 'pix-drift-b' : 'pix-drift-c')
            : '';
          // Idle drift (keyframe) lives on the <g>; the scroll scatter (GSAP transform) lives
          // on the inner <rect>. Separate elements → the two transforms compose.
          return (
            <g key={i} className={driftClass} style={{ animationDelay: `${(i % 11) * 0.18}s` }}>
              <rect
                x={p.x}
                y={p.y}
                width="0.95"
                height="0.95"
                fill={p.color}
                className={p.drift > 0 ? 'hero-pix-scatter' : undefined}
                data-dx={p.drift > 0 ? p.dx : undefined}
                data-dy={p.drift > 0 ? p.dy : undefined}
              />
            </g>
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
          {/* Paras · 2026-06-19: explicit {' '} between the line spans — without them the h1's
              text content reads "We designpremium websitesby pixel." to crawlers/screen readers.
              Trailing spaces on block lines collapse, so there's no visual change. */}
          <span className="line">We design{' '}</span>
          <span className="line">
            <em>premium</em> websites{' '}
          </span>
          {/* Paras: pixel block + “by pixel.” — layout moved to CSS (.hero-line-pix) so the
              block size and the gap before “by” can shrink on phones, where this line crowded. */}
          <span className="line hero-line-pix">
            <PixelDispersion />
            <span>by <span className="accent">pixel.</span></span>
          </span>
        </h1>

        <div className="hero-foot">
          <p style={{ maxWidth: '46ch', fontSize: 18 }}>
            A small, opinionated studio building modern websites for the brands India is building next.
          </p>
          <div className="hero-cta-wrap">
            <a href="#contact" className="btn btn-primary">
              <span className="pix"></span> Book intro call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
