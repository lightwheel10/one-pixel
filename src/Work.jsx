import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Marquee() {
  const ref = useRef(null);
  const items = ['Pixel perfect since 2024', 'Design × Engineering', 'Brand → Web', 'Built to convert', 'Made in India'];

  // Paras · 2026-06-18: GSAP-driven marquee that reacts to scroll velocity — it speeds up and
  // skews while you scroll, flips direction on scroll-up, and eases back to a steady glide when
  // idle. The CSS keyframe scroll stays as the reduced-motion / no-JS fallback.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const track = ref.current?.querySelector('.marquee-track');
    if (!track) return;
    track.classList.add('js-marquee');
    let tween, skewTo, dir = 1, idleTimer;
    const ctx = gsap.context(() => {
      tween = gsap.to(track, { xPercent: -50, repeat: -1, duration: 30, ease: 'none' });
      skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v !== 0) dir = v > 0 ? 1 : -1;
          const boost = gsap.utils.clamp(1, 5, Math.abs(v) / 250);
          gsap.to(tween, { timeScale: dir * boost, duration: 0.3, overwrite: true });
          skewTo(gsap.utils.clamp(-10, 10, v / -400));
        },
      });
    }, ref);
    // ease back to a steady glide + no skew shortly after scrolling stops
    const onScroll = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (tween) gsap.to(tween, { timeScale: dir, duration: 0.6, overwrite: true });
        if (skewTo) skewTo(0);
      }, 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(idleTimer); ctx.revert(); };
  }, []);

  return (
    <div className="marquee" aria-hidden ref={ref}>
      <div className="marquee-track">
        {[0, 1].map((rep) => (
          <span key={rep}>
            {items.map((it, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 64 }}>
                {it}
                <span className="star">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Work() {
  const ref = useRef(null);
  // Paras · 2026-06-18: staggered scroll reveal — each work row fades + slides up in turn
  // as the list enters (replaces the per-item IntersectionObserver reveal). Reduced-motion safe.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.work-item', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.work-grid', start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const items = [
    { num: '01', name: 'Mehta & Sons',     meta: ['Family Office', 'Brand + Site', '2026'], href: '/case-studies/halcyon/', live: true },
    { num: '02', name: 'Sahyadri & Co',    meta: ['Tax + Advisory', 'Brand + Site', '2026'], href: '/case-studies/sahyadri/' },
    { num: '03', name: 'Forest & Loom',    meta: ['D2C Textiles', 'Shopify', '2025'] },
    { num: '04', name: 'Sangam Type Co',   meta: ['Type Foundry', 'Design + Dev', '2025'] },
    { num: '05', name: 'Pravah Cloud',     meta: ['B2B SaaS', 'Site + Docs', '2025'] },
    { num: '06', name: 'Coast & Co',       meta: ['Boutique Hotels', 'CMS', '2024'] },
    { num: '07', name: 'Karya Industries', meta: ['Industrial', 'Site', '2024'] },
  ];

  return (
    <section id="work" ref={ref}>
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-num">[ 01 ] Selected Work</div>
          </div>
          <div>
            <h2 className="section-title">Sites we’ve <em>shipped</em>.</h2>
            <p className="section-sub" style={{ marginTop: 24 }}>
              A small slice of our work. Every project is a premium website built from scratch, and a brand that looks sharper for it.
            </p>
          </div>
        </div>

        <div className="work-grid">
          {items.map((it, i) => (
            <a key={i} className="work-item" href={it.href || '#'}>
              <div className="num">{it.num}</div>
              <div className="name">
                {it.name}
                {it.live && (
                  <span style={{ marginLeft: 12, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, background: 'var(--accent)', display: 'inline-block', borderRadius: 0 }}></span>
                    View live
                  </span>
                )}
              </div>
              <div className="meta">
                {it.meta.map((m, j) => <span key={j}>{m}</span>)}
              </div>
              <div className="arr" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
