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
  // Paras · 2026-06-19: staggered reveal of the gallery cards as they enter. Reduced-motion safe.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.work-card', {
        opacity: 0, y: 36, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.work-gallery', start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const items = [
    { num: '01', name: 'Mehta & Sons',     domain: 'mehta-sons.in',      meta: ['Family Office', 'Brand + Site', '2026'], kind: 'editorial',  href: '/case-studies/halcyon/', live: true, preview: '/work/mehta-sons-full.jpg' },
    { num: '02', name: 'Saint Orson',      domain: 'saintorson.com',     meta: ['Luxury Fashion', 'Editorial Commerce', '2026'], kind: 'ecommerce', href: '/case-studies/saint-orson/', live: true, preview: '/work/saint-orson-full.jpg' },
    { num: '03', name: 'Forest & Loom',    domain: 'forestandloom.com',  meta: ['D2C Textiles', 'Custom Storefront', '2026'], kind: 'ecommerce',  href: '/case-studies/forest-loom/', live: true, preview: '/work/forest-loom-full.jpg' },
    { num: '04', name: 'Sangam Type Co',   domain: 'sangamtype.co',      meta: ['Type Foundry', 'Design + Dev', '2025'],   kind: 'type',       preview: '/work/sangam-type-placeholder.jpg' },
    { num: '05', name: 'Pravah Cloud',     domain: 'pravah.cloud',       meta: ['B2B SaaS', 'Site + Docs', '2026'],        kind: 'saas',       href: '/case-studies/pravah/', live: true, preview: '/work/pravah-cloud-full.jpg' },
    { num: '06', name: 'Atlas & Aangan',   domain: 'atlasandaangan.com', meta: ['Travel Agency', 'Booking Flow', '2026'],  kind: 'structured', href: '/case-studies/atlas-aangan/', live: true, preview: '/work/coast-co-placeholder.jpg' },
    { num: '07', name: 'Karya Solar',      domain: 'karyasolar.com',    meta: ['Solar Infrastructure', 'Site', '2026'],   kind: 'structured', href: '/case-studies/karya/', live: true, preview: '/work/karya-solar-full.jpg' },
  ];

  return (
    <section id="work" ref={ref}>
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-num">Selected Work</div>
          </div>
          <div>
            <h2 className="section-title">Sites we’ve <em>shipped</em>.</h2>
            <p className="section-sub" style={{ marginTop: 24 }}>
              A small slice of our work.
            </p>
          </div>
        </div>

        <div className="work-gallery">
          {items.map((it, i) => (
            // Paras · 2026-06-19: only live projects are real links; placeholders use no href (so they
            // don't jump to top or sit in the tab order as dead links). The preview is decorative → aria-hidden.
            <a key={i} className="work-card" href={it.href || undefined}>
              <div className="work-browser">
                <div className="work-bar">
                  <span className="work-dots" aria-hidden><i /><i /><i /></span>
                </div>
                <div className="work-screen" aria-hidden>
                  <div className="work-shot-wrap">
                    <img
                      className="work-shot"
                      src={it.preview}
                      alt=""
                      loading="lazy"
                      onLoad={(e) => {
                        // The card scrolls the whole preview over a fixed CSS duration, so a tall page
                        // scrolls fast and a short one drags. Normalise to a constant speed (anchored to
                        // the Mehta capture, 1280×9845 → 24.6s) so every card glides at the same pace.
                        const im = e.currentTarget;
                        if (!im.naturalWidth) return;
                        const ratio = im.naturalHeight / im.naturalWidth; // frame is 16:10 → 0.625
                        const dur = Math.max(5, 3.48 * (ratio - 0.625));
                        im.style.transitionDuration = `${dur.toFixed(1)}s`;
                      }}
                    />
                    {it.href && <span className="work-preview-cta">View site</span>}
                  </div>
                </div>
              </div>
              <div className="work-foot">
                <div className="work-name">
                  {it.name}
                </div>
                <span className="work-arr" aria-hidden>↗</span>
                <div className="work-meta">
                  {it.meta.map((m, j) => <span key={j}>{m}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
